const express = require('express');
const prisma = require('../db');
const { verifyToken } = require('../src/middlewares');
const { validateGeofence } = require('../utils/geofencing');

const router = express.Router();

// In-memory store for QR sessions (use Redis in production)
const qrSessions = new Map();

// Rate limiting for session status requests
const sessionRequestLimits = new Map();
const RATE_LIMIT_WINDOW = 5000; // 5 seconds
const MAX_REQUESTS_PER_WINDOW = 3;

// Generate QR session
router.post('/generate', async (req, res) => {
    console.log('🔵 QR Generate request received:', req.body);
    try {
        const { classId, className, latitude, longitude } = req.body;
        console.log('📝 Processing QR generation for:', { classId, className });
        const sessionId = `qr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const expiresAt = new Date(Date.now() + 300000); // 5 minutes from now
        
        const session = {
            sessionId,
            classId: classId || 'CS101',
            className: className || 'Demo Class',
            latitude: latitude || null,
            longitude: longitude || null,
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
                console.log('🗑️ Session expired and cleaned up:', sessionId);
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
            timestamp: new Date().toISOString(),
            requiresLocation: !!(latitude && longitude)
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
    console.log('🎯 QR Mark Attendance Request:', {
        sessionId: req.params.sessionId,
        body: req.body,
        timestamp: new Date().toISOString()
    });
    
    try {
        const { sessionId } = req.params;
        const { studentId, studentName, latitude, longitude } = req.body;
        
        console.log('🔍 Looking up student:', { studentId, studentName });
        
        // Validate student exists in database - handle both studentId and email
        let student;
        
        // First try to find by studentId
        student = await prisma.student.findUnique({
            where: { studentId: studentId }
        });
        
        // If not found and looks like email, try email lookup
        if (!student && studentId.includes('@')) {
            student = await prisma.student.findUnique({
                where: { email: studentId }
            });
        }
        
        // If still not found, try by name (fallback)
        if (!student && studentName) {
            student = await prisma.student.findFirst({
                where: { 
                    name: {
                        contains: studentName,
                        mode: 'insensitive'
                    }
                }
            });
        }
        
        if (!student) {
            console.log('❌ Student not found:', { studentId, studentName });
            return res.status(403).json({ 
                error: 'Student not found in database. Only registered students can mark attendance.',
                searchedFor: studentId,
                suggestion: 'Use student ID (e.g., CS2024001) or registered email'
            });
        }
        
        console.log('✅ Student found:', {
            id: student.id,
            studentId: student.studentId,
            name: student.name,
            email: student.email
        });
        
        if (student.status !== 'Active') {
            return res.status(403).json({ 
                error: 'Student account is not active. Please contact administration.' 
            });
        }
        
        const session = qrSessions.get(sessionId);
        
        if (!session) {
            return res.status(404).json({ error: 'QR session not found or expired' });
        }
        
        if (new Date() > session.expiresAt) {
            qrSessions.delete(sessionId);
            return res.status(410).json({ error: 'QR session has expired' });
        }
        
        // Geofence validation
        let geofenceResult = null;
        if (session.latitude && session.longitude) {
            if (!latitude || !longitude) {
                return res.status(400).json({ 
                    error: 'Location required for this session',
                    requiresLocation: true
                });
            }
            
            geofenceResult = validateGeofence(
                session.latitude, 
                session.longitude, 
                latitude, 
                longitude
            );
            
            if (!geofenceResult.isValid) {
                return res.status(403).json({ 
                    error: `You must be within ${geofenceResult.allowedRadius}m of the class location`,
                    distance: geofenceResult.distance,
                    allowedRadius: geofenceResult.allowedRadius,
                    geofenceViolation: true
                });
            }
        }
        
        // Check if student already marked
        const alreadyMarked = session.attendees.find(a => a.studentId === studentId);
        if (alreadyMarked) {
            return res.status(409).json({ error: 'Attendance already marked for this session' });
        }
        
        // Add to session attendees with validated student info
        session.attendees.push({
            studentId: student.studentId,
            studentName: student.name,
            department: student.department,
            class: student.class,
            markedAt: new Date(),
            status: 'present'
        });
        
        // Create attendance record in database
        console.log('💾 Creating attendance record:', {
            studentId: student.id,
            classId: session.classId,
            status: 'present'
        });
        
        // Create attendance record with geofencing data
        const attendanceData = {
            studentId: student.id,
            classId: session.classId,
            status: 'present',
            timestamp: new Date().toISOString()
        };
        
        // Add geofencing data to attendance record
        if (latitude && longitude) {
            attendanceData.studentLatitude = latitude;
            attendanceData.studentLongitude = longitude;
            console.log('📍 Location data stored:', { latitude, longitude });
        }
        
        if (geofenceResult) {
            attendanceData.distanceFromClass = geofenceResult.distance;
            attendanceData.locationVerified = geofenceResult.isValid;
            console.log(`📍 Geofence validation: ${geofenceResult.distance}m, verified: ${geofenceResult.isValid}`);
        } else {
            attendanceData.locationVerified = false;
        }
        
        let attendanceRecord;
        try {
            attendanceRecord = await prisma.studentAttendance.create({
                data: attendanceData
            });
            console.log('✅ Attendance record created:', attendanceRecord.id);
        } catch (dbError) {
            console.error('❌ Database error creating attendance:', dbError);
            return res.status(500).json({ 
                error: 'Failed to save attendance record',
                details: 'Database validation error'
            });
        }
        
        const response = {
            message: 'Attendance marked successfully',
            studentName: student.name,
            studentId: student.studentId,
            department: student.department,
            markedAt: new Date(),
            attendanceId: attendanceRecord.id,
            locationVerified: !!geofenceResult?.isValid,
            distance: geofenceResult?.distance || null
        };
        
        console.log('🎉 QR Attendance Success:', response);
        res.json(response);
    } catch (error) {
        console.error('QR mark attendance error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get session status
router.get('/session/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const clientIP = req.ip || req.connection.remoteAddress;
        const rateLimitKey = `${clientIP}-${sessionId}`;
        
        // Rate limiting check
        const now = Date.now();
        const requestHistory = sessionRequestLimits.get(rateLimitKey) || [];
        const recentRequests = requestHistory.filter(time => now - time < RATE_LIMIT_WINDOW);
        
        if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
            return res.status(429).json({ 
                error: 'Too many requests. Please wait before polling again.',
                retryAfter: Math.ceil(RATE_LIMIT_WINDOW / 1000)
            });
        }
        
        // Update request history
        recentRequests.push(now);
        sessionRequestLimits.set(rateLimitKey, recentRequests);
        
        const session = qrSessions.get(sessionId);
        
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        
        const currentTime = new Date();
        const isExpired = currentTime > session.expiresAt;
        const timeLeft = Math.max(0, Math.floor((session.expiresAt - currentTime) / 1000));
        
        // Clean up expired sessions
        if (isExpired) {
            qrSessions.delete(sessionId);
        }
        
        res.json({
            sessionId: session.sessionId,
            className: session.className,
            isActive: !isExpired,
            timeLeft,
            attendees: session.attendees,
            totalMarked: session.attendees.length,
            pollInterval: isExpired ? 0 : Math.min(timeLeft * 1000, 10000), // Suggest polling interval
            lastUpdated: currentTime.toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;