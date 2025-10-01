const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const prisma = require('../db');
const { validateLogin, validateRegistration, authLimiter } = require('../src/middlewares');

// Configure multer for avatar uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// JWT middleware
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.error('JWT verification error:', err.message);
        return res.status(403).json({ error: 'Invalid or expired token' });
      }
      console.log('JWT decoded user:', user);
      req.user = user;
      next();
    });
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(500).json({ error: 'Authentication error' });
  }
};

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

        const token = jwt.sign({ 
            id: user.id, 
            email: user.email, 
            role: user.role 
        }, JWT_SECRET, { expiresIn: '24h' });
        
        console.log('Login token created for user:', { id: user.id, email: user.email, role: user.role });
        
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

// Update profile
router.put('/profile', authenticateToken, upload.single('avatar'), async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.user.id || req.user.userId;
        
        if (!userId) {
            return res.status(400).json({ error: 'Invalid user data' });
        }
        
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        
        // Handle avatar upload
        if (req.file) {
            const avatarBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
            updateData.avatarUrl = avatarBase64;
        }
        
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatarUrl: true
            }
        });
        
        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Profile update error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Get profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id || req.user.userId;
        
        if (!userId) {
            return res.status(400).json({ error: 'Invalid user data' });
        }
        
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatarUrl: true
            }
        });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Get profile error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Change password
router.post('/change-password', authenticateToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id || req.user.userId;
        
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current password and new password are required' });
        }
        
        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'New password must be at least 6 characters long' });
        }
        
        // Get current user
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }
        
        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        
        // Update password
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedNewPassword }
        });
        
        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;