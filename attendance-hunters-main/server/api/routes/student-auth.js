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

        // Find student by email
        const student = await prisma.student.findUnique({
            where: { email }
        });

        if (!student) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, student.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                studentId: student.id,
                email: student.email,
                role: 'student'
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Return student data without password
        const { password: _, ...studentData } = student;
        
        res.json({
            success: true,
            token,
            student: studentData
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
        
        const student = await prisma.student.findUnique({
            where: { id: decoded.studentId }
        });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const { password: _, ...studentData } = student;
        res.json({ student: studentData });

    } catch (error) {
        console.error('Profile error:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
});

module.exports = router;