// Export all middleware
const { verifyToken, authorize, adminOnly, employeeOrAdmin } = require('./auth');
const { 
    validateLogin, 
    validateRegistration, 
    validateAttendance, 
    validateUserUpdate 
} = require('./validation');
const { apiLimiter, authLimiter, attendanceLimiter } = require('./rateLimiter');
const { errorHandler, notFound } = require('./errorHandler');

module.exports = {
    // Auth middleware
    verifyToken,
    authorize,
    adminOnly,
    employeeOrAdmin,
    
    // Validation middleware
    validateLogin,
    validateRegistration,
    validateAttendance,
    validateUserUpdate,
    
    // Rate limiting middleware
    apiLimiter,
    authLimiter,
    attendanceLimiter,
    
    // Error handling middleware
    errorHandler,
    notFound
};