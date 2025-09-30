const express = require('express');
const prisma = require('../db');
const { verifyToken } = require('../src/middlewares');

const router = express.Router();

// Get all classes
router.get('/', verifyToken, async (req, res) => {
    try {
        const classes = await prisma.class.findMany({
            include: {
                _count: {
                    select: { students: true }
                }
            }
        });
        res.json({ classes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new class
router.post('/', verifyToken, (req, res, next) => {
    // CSRF protection
    if (!req.headers['x-requested-with'] && !req.headers['x-csrf-token']) {
        return res.status(403).json({ error: 'CSRF token required' });
    }
    next();
}, async (req, res) => {
    try {
        const { name, code, faculty, maxStudents, schedule, room } = req.body;
        
        // Check if class code already exists
        const existingClass = await prisma.class.findUnique({ where: { code } });
        if (existingClass) {
            return res.status(400).json({ error: 'Class code already exists' });
        }
        
        const newClass = await prisma.class.create({
            data: {
                name,
                code,
                faculty,
                maxStudents: parseInt(maxStudents),
                schedule,
                room,
                createdBy: req.user.id
            }
        });
        
        res.status(201).json({
            message: 'Class created successfully',
            class: newClass
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update class
router.put('/:id', verifyToken, (req, res, next) => {
    // CSRF protection
    if (!req.headers['x-requested-with'] && !req.headers['x-csrf-token']) {
        return res.status(403).json({ error: 'CSRF token required' });
    }
    next();
}, async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        const updatedClass = await prisma.class.update({
            where: { id: parseInt(id) },
            data: updates
        });
        
        res.json({
            message: 'Class updated successfully',
            class: updatedClass
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete class
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        
        await prisma.class.delete({
            where: { id: parseInt(id) }
        });
        
        res.json({ message: 'Class deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;