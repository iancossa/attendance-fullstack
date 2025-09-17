# Auth Middleware Usage

## Installation
```bash
npm install
```

## Environment Variables
Add to your `.env` file:
```
JWT_SECRET=your-super-secret-jwt-key
```

## Usage Examples

### Basic Route Protection
```javascript
const express = require('express');
const { verifyToken, adminOnly } = require('./middlewares');

const router = express.Router();

// Protected route - requires valid JWT
router.get('/profile', verifyToken, (req, res) => {
    res.json({ user: req.user });
});

// Admin only route
router.get('/admin/users', verifyToken, adminOnly, (req, res) => {
    // Only admins can access this
});
```

### Login Route with Validation
```javascript
const { validateLogin, authLimiter } = require('./middlewares');

router.post('/login', authLimiter, validateLogin, async (req, res) => {
    // Login logic here
});
```

### Complete Server Setup
```javascript
const express = require('express');
const { apiLimiter, errorHandler, notFound } = require('./middlewares');

const app = express();

// Apply global middleware
app.use(apiLimiter);
app.use(express.json());

// Routes here...

// Error handling (must be last)
app.use(notFound);
app.use(errorHandler);
```

## Middleware Types

### Auth Middleware
- `verifyToken` - Validates JWT tokens
- `adminOnly` - Requires admin role
- `employeeOrAdmin` - Requires employee or admin role

### Validation Middleware
- `validateLogin` - Email/password validation
- `validateRegistration` - User registration validation
- `validateAttendance` - Attendance record validation

### Rate Limiting
- `apiLimiter` - General API rate limiting
- `authLimiter` - Strict auth endpoint limiting
- `attendanceLimiter` - Attendance endpoint limiting

### Error Handling
- `errorHandler` - Global error handler
- `notFound` - 404 handler