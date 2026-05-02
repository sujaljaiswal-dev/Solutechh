const Product = require('../models/Product');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { validationResult } = require('express-validator');

/**
 * @desc Get all active products with filters
 * @route GET /api/products
 * @access Public
 * @query {string} category - Filter by category
 * @query {string} search - Search by name or description
 * @query {number} page - Page number
 * @query {number} limit - Items per page
 */
const getAllProducts = async (req, res, next) => {
    try {
        const { category, search, page = 1, limit = 10 } = req.query;

        // Build filter query
        let filter = { isActive: true };

        if (category) {
            filter.category = category;
        }

        if (search) {
            filter.$text = { $search: search };
        }

        // Pagination
        const skip = (page - 1) * limit;

        const products = await Product.find(filter)
            .select('-createdBy')
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await Product.countDocuments(filter);

        sendSuccess(res, 200, 'Products retrieved successfully', {
            products,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                currentPage: parseInt(page),
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Get single product by ID
 * @route GET /api/products/:id
 * @access Public
 */
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('createdBy', 'name email')
            .where({ isActive: true });

        if (!product) {
            return sendError(res, 404, 'Product not found');
        }

        sendSuccess(res, 200, 'Product retrieved successfully', product);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
};
