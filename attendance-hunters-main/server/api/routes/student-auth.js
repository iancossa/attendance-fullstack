const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../db');

const router = express.Router();

// Student login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user with student role by email
        const user = await prisma.user.findUnique({
            where: { email },
            include: { student: true }
        });



        if (!user || user.role !== 'student') {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (!user.student) {
            return res.status(401).json({ error: 'Student profile not found' });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.id,
                studentId: user.student?.id || null,
                email: user.email,
                role: 'student'
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Return user and student data without password
        const { password: _, ...userData } = user;
        
        res.json({
            success: true,
            token,
            user: userData
        });

    } catch (error) {
        console.error('Student login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get current student profile
router.get('/profile', async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            include: { student: true }
        });

        if (!user || !user.student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const { password: _, ...userData } = user;
        res.json({ user: userData });

    } catch (error) {
        console.error('Profile error:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
});

module.exports = router;