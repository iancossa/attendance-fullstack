const express = require('express');
const prisma = require('../db');
const { verifyToken, adminOnly, validateUserUpdate } = require('../src/middlewares');

const router = express.Router();

// Get all users (admin only)
router.get('/', verifyToken, adminOnly, async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, email: true, name: true, employeeId: true, role: true, createdAt: true }
        });
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get current user profile
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, email: true, name: true, employeeId: true, role: true }
        });
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user (admin only)
router.put('/:id', verifyToken, adminOnly, validateUserUpdate, async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: updates,
            select: { id: true, email: true, name: true, employeeId: true, role: true }
        });
        
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;