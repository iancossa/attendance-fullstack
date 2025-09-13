const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const { verifyToken } = require('../src/middlewares');

const router = express.Router();
const prisma = new PrismaClient();

// In-memory store for QR sessions (use Redis in production)
const qrSessions = new Map();

// Generate QR session
router.post('/generate', async (req, res) => {
    console.log('🔵 QR Generate request received:', req.body);
    try {
        const { classId, className } = req.body;
        console.log('📝 Processing QR generation for:', { classId, className });
        const sessionId = `qr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const expiresAt = new Date(Date.now() + 300000); // 5 minutes from now
        
        const session = {
            sessionId,
            classId: classId || 'CS101',
            className: className || 'Demo Class',
            createdBy: req.user?.id || 'demo-user',
            createdAt: new Date(),
            expiresAt,
            isActive: true,
            attendees: []
        };
        
        qrSessions.set(sessionId, session);
        
        // Auto-expire session after 5 minutes
        setTimeout(() => {
            if (qrSessions.has(sessionId)) {
                qrSessions.delete(sessionId);
            }
        }, 300000);
        
        // Create QR data in JSON format for better mobile compatibility
        const qrData = {
            type: 'attendance',
            sessionId: sessionId,
            className: session.className,
            classId: session.classId,
            apiUrl: 'https://attendance-fullstack.onrender.com/api/qr/mark/' + sessionId,
            expiresAt: expiresAt.toISOString(),
            timestamp: new Date().toISOString()
        };
        
        const response = {
            sessionId,
            qrData: JSON.stringify(qrData),
            expiresAt,
            expiresIn: 300,
            className: session.className,
            classId: session.classId
        };
        
        console.log('✅ QR session created successfully:', response);
        res.json(response);
    } catch (error) {
        console.error('❌ QR generation error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Mark attendance via QR
router.post('/mark/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { studentId, studentName } = req.body;
        
        const session = qrSessions.get(sessionId);
        
        if (!session) {
            return res.status(404).json({ error: 'QR session not found or expired' });
        }
        
        if (new Date() > session.expiresAt) {
            qrSessions.delete(sessionId);
            return res.status(410).json({ error: 'QR session has expired' });
        }
        
        // Check if student already marked
        const alreadyMarked = session.attendees.find(a => a.studentId === studentId);
        if (alreadyMarked) {
            return res.status(409).json({ error: 'Attendance already marked' });
        }
        
        // Add to session attendees
        session.attendees.push({
            studentId,
            studentName,
            markedAt: new Date(),
            status: 'present'
        });
        
        res.json({
            message: 'Attendance marked successfully',
            studentName,
            markedAt: new Date()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get session status
router.get('/session/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = qrSessions.get(sessionId);
        
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        
        const now = new Date();
        const isExpired = now > session.expiresAt;
        const timeLeft = Math.max(0, Math.floor((session.expiresAt - now) / 1000));
        
        res.json({
            sessionId: session.sessionId,
            className: session.className,
            isActive: !isExpired,
            timeLeft,
            attendees: session.attendees,
            totalMarked: session.attendees.length
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;