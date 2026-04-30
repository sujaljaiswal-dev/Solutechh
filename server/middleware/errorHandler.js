/**
 * Global error handling middleware
 * Must be the last middleware defined
 * @param {Object} error - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);

    // Default error response
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Internal Server Error';

    // Mongoose validation error
    if (error.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(error.errors)
            .map((err) => err.message)
            .join(', ');
    }

    // Mongoose cast error (invalid ID)
    if (error.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
    }

    // Mongoose duplicate key error
    if (error.code === 11000) {
        statusCode = 400;
        const field = Object.keys(error.keyPattern)[0];
        message = `${field} already exists`;
    }

    // JWT errors
    if (error.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    if (error.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token has expired';
    }

    res.status(statusCode).json({
        success: false,
        message: message,
        ...(process.env.NODE_ENV === 'development' && { error: error.stack }),
    });
};

module.exports = errorHandler;
