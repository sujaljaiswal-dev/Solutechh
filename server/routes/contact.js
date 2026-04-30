const express = require('express');
const { body } = require('express-validator');
const contactController = require('../controllers/contactController');
const { contactLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

/**
 * POST /api/contact
 * Submit contact form
 */
router.post(
    '/',
    contactLimiter,
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email')
            .isEmail()
            .withMessage('Please provide a valid email')
            .normalizeEmail(),
        body('phone')
            .trim()
            .matches(/^[\d\s\-\+\(\)]+$/)
            .withMessage('Please provide a valid phone number'),
        body('reason')
            .trim()
            .notEmpty()
            .withMessage('Reason for contact is required')
            .isLength({ max: 2000 })
            .withMessage('Reason cannot exceed 2000 characters'),
    ],
    contactController.submitContact
);

module.exports = router;
