const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../../database/generated/prisma');
const { validateLogin, validateRegistration, authLimiter } = require('../src/middlewares');

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register
router.post('/register', validateRegistration, async (req, res) => {
    try {
        const { email, password, name, employeeId } = req.body;
        
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                employeeId,
                role: 'employee'
            }
        });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
        
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            token,
            user: { id: user.id, email: user.email, name: user.name, role: user.role }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login
router.post('/login', validateLogin, async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await prisma.user.findUnique({ 
            where: { email },
            include: {
                admin: true,
                staff: true,
                student: true
            }
        });
        
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
        });

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
        
        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: { 
                id: user.id, 
                email: user.email, 
                name: user.name, 
                role: user.role,
                avatarUrl: user.avatarUrl,
                staff: user.staff,
                student_id: user.student?.id?.toString()
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;