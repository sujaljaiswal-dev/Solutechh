const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post(
    '/register',
    authLimiter,
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email')
            .isEmail()
            .withMessage('Please provide a valid email')
            .normalizeEmail(),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters'),
    ],
    authController.register
);

/**
 * POST /api/auth/login
 * Login user
 */
router.post(
    '/login',
    authLimiter,
    [
        body('email')
            .isEmail()
            .withMessage('Please provide a valid email')
            .normalizeEmail(),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    authController.login
);

/**
 * GET /api/auth/me
 * Get logged-in user profile
 */
router.get('/me', authMiddleware, authController.getProfile);

/**
 * POST /api/auth/logout
 * Logout user
 */
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;
