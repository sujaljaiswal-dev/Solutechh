const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { validationResult } = require('express-validator');

/**
 * Generate JWT Token
 * @param {string} userId - User ID
 * @returns {string} - JWT Token
 */
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
};

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
const register = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendError(res, 400, errors.array()[0].msg);
        }

        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return sendError(res, 400, 'User already exists with that email');
        }

        // Create new user
        user = new User({
            name,
            email,
            password,
        });

        await user.save();

        // Generate token
        const token = generateToken(user._id);

        sendSuccess(res, 201, 'User registered successfully', {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Login user
 * @route POST /api/auth/login
 * @access Public
 */
const login = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendError(res, 400, errors.array()[0].msg);
        }

        const { email, password } = req.body;

        // Find user by email and include password
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return sendError(res, 401, 'Invalid email or password');
        }

        // Check if password matches
        const isPasswordMatch = await user.matchPassword(password);

        if (!isPasswordMatch) {
            return sendError(res, 401, 'Invalid email or password');
        }

        // Generate token
        const token = generateToken(user._id);

        sendSuccess(res, 200, 'Login successful', {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Get current logged-in user profile
 * @route GET /api/auth/me
 * @access Private
 */
const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return sendError(res, 404, 'User not found');
        }

        sendSuccess(res, 200, 'Profile retrieved successfully', {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Logout user
 * @route POST /api/auth/logout
 * @access Private
 */
const logout = async (req, res, next) => {
    try {
        // Token is cleared on client side, here we just send confirmation
        sendSuccess(res, 200, 'Logout successful', null);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    getProfile,
    logout,
};
