const rateLimit = require('express-rate-limit');

/**
 * Rate limiter for authentication routes
 * Limit: 5 requests per 15 minutes
 */
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many authentication attempts, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * Rate limiter for contact form
 * Limit: 3 requests per hour
 */
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: 'Too many contact submissions, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    authLimiter,
    contactLimiter,
};
