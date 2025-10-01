const jwt = require('jsonwebtoken');
const prisma = require('../../db');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// JWT Token verification middleware
const verifyToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

// Role-based authorization middleware
const authorize = (roles = []) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'User not authenticated.' });
            }

            const user = await prisma.user.findUnique({
                where: { id: req.user.id }
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
            }

            req.user.role = user.role;
            next();
        } catch (error) {
            res.status(500).json({ error: 'Authorization failed.' });
        }
    };
};

// Admin only middleware
const adminOnly = authorize(['admin']);

// Employee or Admin middleware
const employeeOrAdmin = authorize(['employee', 'admin']);

module.exports = {
    verifyToken,
    authorize,
    adminOnly,
    employeeOrAdmin
};