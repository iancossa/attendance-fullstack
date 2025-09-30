const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const prisma = require('../../db');
const { apiLimiter, errorHandler, notFound } = require('../middlewares');

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection test
async function connectDatabase() {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1);
    }
}

// Security middleware
app.use(helmet());
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// app.use(apiLimiter); // Disabled for development

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/auth', require('../../routes/auth'));
app.use('/api/student-auth', require('../../routes/student-auth'));
app.use('/api/attendance', require('../../routes/attendance'));
app.use('/api/users', require('../../routes/users'));
app.use('/api/students', require('../../routes/students'));
app.use('/api/departments', require('../../routes/departments'));
app.use('/api/qr', require('../../routes/qr'));
app.use('/api/classes', require('../../routes/classes'));
app.use('/api/reports', require('../../routes/reports'));

// Root endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'Attendance Hunters API Server',
        version: '1.0.0',
        status: 'Running',
        timestamp: new Date().toISOString(),
        endpoints: {
            health: '/health',
            api: '/api',
            test: '/api/test'
        }
    });
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
    console.log('🧪 Test endpoint hit!');
    res.json({ message: 'API is working!', timestamp: new Date().toISOString() });
});

// Health check with database status
app.get('/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ 
            status: 'OK', 
            database: 'Connected',
            timestamp: new Date().toISOString(),
            version: '1.0.0'
        });
    } catch (error) {
        res.status(503).json({ 
            status: 'Error', 
            database: 'Disconnected',
            timestamp: new Date().toISOString() 
        });
    }
});

// API documentation endpoint
app.get('/api', (req, res) => {
    res.json({
        message: 'Attendance RPA API',
        version: '1.0.0',
        endpoints: {
            auth: {
                'POST /api/auth/register': 'Register new user',
                'POST /api/auth/login': 'Login user'
            },
            attendance: {
                'POST /api/attendance': 'Record attendance (auth required)',
                'GET /api/attendance': 'Get attendance records (auth required)'
            },
            users: {
                'GET /api/users': 'Get all users (admin only)',
                'GET /api/users/profile': 'Get current user profile (auth required)',
                'PUT /api/users/:id': 'Update user (admin only)'
            },
            qr: {
                'POST /api/qr/generate': 'Generate QR session (no auth required)',
                'POST /api/qr/mark/:sessionId': 'Mark attendance via QR',
                'GET /api/qr/session/:sessionId': 'Get session status (no auth required)'
            },
            classes: {
                'GET /api/classes': 'Get all classes (auth required)',
                'POST /api/classes': 'Create new class (auth required)',
                'PUT /api/classes/:id': 'Update class (auth required)',
                'DELETE /api/classes/:id': 'Delete class (auth required)'
            },
            students: {
                'GET /api/students': 'Get all students (auth required)',
                'POST /api/students': 'Create new student (admin only)',
                'PUT /api/students/:id': 'Update student (admin only)',
                'GET /api/students/:id/attendance': 'Get student attendance history (auth required)'
            },
            departments: {
                'GET /api/departments': 'Get all departments (auth required)',
                'GET /api/departments/:id': 'Get department details (auth required)',
                'POST /api/departments': 'Create new department (admin only)',
                'PUT /api/departments/:id': 'Update department (admin only)',
                'DELETE /api/departments/:id': 'Delete department (admin only)',
                'GET /api/departments/:id/faculty': 'Get department faculty (auth required)',
                'POST /api/departments/:id/faculty': 'Add faculty to department (admin only)',
                'PUT /api/departments/:id/faculty/:facultyId': 'Update faculty (admin only)',
                'GET /api/departments/:id/settings': 'Get department settings and stats (auth required)'
            }
        }
    });
});

// Error handling (must be last)
app.use(notFound);
app.use(errorHandler);

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🔄 Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});

// Start server
async function startServer() {
    await connectDatabase();
    
    app.listen(PORT, () => {
        console.log('\n🚀 Attendance RPA Server Started');
        console.log('================================');
        console.log(`📍 Server: http://localhost:${PORT}`);
        console.log(`📊 Health: http://localhost:${PORT}/health`);
        console.log(`📚 API Docs: http://localhost:${PORT}/api`);
        console.log(`🔐 JWT Secret: ${process.env.JWT_SECRET ? 'Configured' : 'Missing'}`);
        console.log(`🗄️  Database: ${process.env.DATABASE_URL ? 'Configured' : 'Missing'}`);
        console.log('================================\n');
    });
}

startServer().catch(console.error);

module.exports = app;