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
        body('inquiryType')
            .optional()
            .isIn(['customer', 'career'])
            .withMessage('Invalid inquiry type'),
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
            .withMessage('Message is required')
            .isLength({ max: 2000 })
            .withMessage('Reason cannot exceed 2000 characters'),
        body('applyingFor')
            .optional({ nullable: true, checkFalsy: true })
            .custom((value, { req }) => {
                if (req.body.inquiryType === 'career' && !value) {
                    throw new Error('Applying For is required for career inquiries');
                }

                const allowedPositions = [
                    'Office Admin',
                    'CSSD Manager',
                    'CSSD Clerk',
                    'Housekeeping',
                    'Project Manager',
                    'Sales',
                ];

                if (value && !allowedPositions.includes(value)) {
                    throw new Error('Please select a valid position');
                }

                return true;
            }),
    ],
    contactController.submitContact
);

module.exports = router;
