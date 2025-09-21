const expressValidator = require('express-validator');
const { body, validationResult } = expressValidator;

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors.array()
        });
    }
    next();
};

// Login validation
const validateLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    handleValidationErrors
];

// Registration validation
const validateRegistration = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    body('name')
        .trim()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters'),
    body('employeeId')
        .optional()
        .trim()
        .isLength({ min: 1 })
        .withMessage('Employee ID cannot be empty'),
    handleValidationErrors
];

// Attendance validation
const validateAttendance = [
    body('employeeId')
        .trim()
        .notEmpty()
        .withMessage('Employee ID is required'),
    body('type')
        .isIn(['check-in', 'check-out'])
        .withMessage('Type must be check-in or check-out'),
    handleValidationErrors
];

// Update user validation
const validateUserUpdate = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters'),
    body('email')
        .optional()
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),
    body('role')
        .optional()
        .isIn(['admin', 'employee'])
        .withMessage('Role must be admin or employee'),
    handleValidationErrors
];

module.exports = {
    validateLogin,
    validateRegistration,
    validateAttendance,
    validateUserUpdate,
    handleValidationErrors
};