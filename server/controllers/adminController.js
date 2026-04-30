const Product = require('../models/Product');
const ContactRequest = require('../models/ContactRequest');
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { validationResult } = require('express-validator');
const {
    uploadToCloudinary,
    deleteFromCloudinary,
} = require('../config/cloudinary');
const fs = require('fs');

/**
 * @desc Add new product
 * @route POST /api/admin/products
 * @access Private (Admin only)
 */
const addProduct = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Clean up uploaded file if validation fails
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.error('Error deleting file:', err);
                });
            }
            return sendError(res, 400, errors.array()[0].msg);
        }

        // Check if image file is provided
        if (!req.file) {
            return sendError(res, 400, 'Product image is required');
        }

        const { name, description, category, specifications } = req.body;

        // Upload image to Cloudinary
        const { url, publicId } = await uploadToCloudinary(
            req.file.path,
            'products'
        );

        // Clean up temporary file
        fs.unlink(req.file.path, (err) => {
            if (err) console.error('Error deleting temporary file:', err);
        });

        // Parse specifications if it's a string
        let parsedSpecifications = [];
        if (specifications) {
            try {
                parsedSpecifications = JSON.parse(specifications);
            } catch (e) {
                parsedSpecifications = [];
            }
        }

        // Create new product
        const product = new Product({
            name,
            description,
            category,
            image: {
                url,
                publicId,
            },
            specifications: parsedSpecifications,
            createdBy: req.user.id,
        });

        await product.save();

        sendSuccess(res, 201, 'Product added successfully', product);
    } catch (error) {
        // Clean up uploaded file on error
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }
        next(error);
    }
};

/**
 * @desc Update product
 * @route PUT /api/admin/products/:id
 * @access Private (Admin only)
 */
const updateProduct = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.error('Error deleting file:', err);
                });
            }
            return sendError(res, 400, errors.array()[0].msg);
        }

        let product = await Product.findById(req.params.id);

        if (!product) {
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.error('Error deleting file:', err);
                });
            }
            return sendError(res, 404, 'Product not found');
        }

        const { name, description, category, specifications } = req.body;

        // Update basic fields
        if (name) product.name = name;
        if (description) product.description = description;
        if (category) product.category = category;

        // Handle image update
        if (req.file) {
            // Delete old image from Cloudinary
            if (product.image && product.image.publicId) {
                await deleteFromCloudinary(product.image.publicId);
            }

            // Upload new image
            const { url, publicId } = await uploadToCloudinary(
                req.file.path,
                'products'
            );

            product.image = { url, publicId };

            // Clean up temporary file
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting temporary file:', err);
            });
        }

        // Update specifications
        if (specifications) {
            try {
                product.specifications = JSON.parse(specifications);
            } catch (e) {
                product.specifications = [];
            }
        }

        await product.save();

        sendSuccess(res, 200, 'Product updated successfully', product);
    } catch (error) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }
        next(error);
    }
};

/**
 * @desc Delete product
 * @route DELETE /api/admin/products/:id
 * @access Private (Admin only)
 */
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return sendError(res, 404, 'Product not found');
        }

        // Delete image from Cloudinary
        if (product.image && product.image.publicId) {
            await deleteFromCloudinary(product.image.publicId);
        }

        await Product.findByIdAndDelete(req.params.id);

        sendSuccess(res, 200, 'Product deleted successfully', null);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Toggle product active/inactive status
 * @route PATCH /api/admin/products/:id/toggle
 * @access Private (Admin only)
 */
const toggleProductStatus = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return sendError(res, 404, 'Product not found');
        }

        product.isActive = !product.isActive;
        await product.save();

        sendSuccess(res, 200, 'Product status updated successfully', product);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Get all products
 * @route GET /api/admin/products
 * @access Private (Admin only)
 * @query {string} category - Filter by category
 * @query {number} page - Page number
 * @query {number} limit - Items per page
 */
const getAllProducts = async (req, res, next) => {
    try {
        const { category, page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const filter = {};
        if (category) {
            filter.category = category;
        }

        const products = await Product.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Product.countDocuments(filter);

        sendSuccess(res, 200, 'Products retrieved successfully', {
            products,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Get all contact requests
 * @route GET /api/admin/contacts
 * @access Private (Admin only)
 * @query {string} status - Filter by status (new, read, responded)
 * @query {number} page - Page number
 * @query {number} limit - Items per page
 */
const getAllContacts = async (req, res, next) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;

        let filter = {};
        if (status) {
            filter.status = status;
        }

        const skip = (page - 1) * limit;

        const contacts = await ContactRequest.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await ContactRequest.countDocuments(filter);

        sendSuccess(res, 200, 'Contact requests retrieved successfully', contacts, {
            total,
            pages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            limit: parseInt(limit),
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Get single contact request
 * @route GET /api/admin/contacts/:id
 * @access Private (Admin only)
 */
const getContactById = async (req, res, next) => {
    try {
        const contact = await ContactRequest.findById(req.params.id).populate(
            'respondedBy',
            'name email'
        );

        if (!contact) {
            return sendError(res, 404, 'Contact request not found');
        }

        // Mark as read
        if (contact.status === 'new') {
            contact.status = 'read';
            await contact.save();
        }

        sendSuccess(res, 200, 'Contact request retrieved successfully', contact);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Update contact request status
 * @route PATCH /api/admin/contacts/:id
 * @access Private (Admin only)
 */
const updateContactStatus = async (req, res, next) => {
    try {
        const { status, notes } = req.body;

        const validStatuses = ['new', 'read', 'responded'];
        if (!validStatuses.includes(status)) {
            return sendError(res, 400, 'Invalid status');
        }

        let contact = await ContactRequest.findById(req.params.id);

        if (!contact) {
            return sendError(res, 404, 'Contact request not found');
        }

        contact.status = status;
        if (notes) {
            contact.notes = notes;
        }
        if (status === 'responded') {
            contact.respondedBy = req.user.id;
        }

        await contact.save();

        sendSuccess(res, 200, 'Contact status updated successfully', contact);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Delete contact request
 * @route DELETE /api/admin/contacts/:id
 * @access Private (Admin only)
 */
const deleteContact = async (req, res, next) => {
    try {
        const contact = await ContactRequest.findById(req.params.id);

        if (!contact) {
            return sendError(res, 404, 'Contact request not found');
        }

        await ContactRequest.findByIdAndDelete(req.params.id);

        sendSuccess(res, 200, 'Contact request deleted successfully', null);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Get dashboard statistics
 * @route GET /api/admin/dashboard
 * @access Private (Admin only)
 */
const getDashboardStats = async (req, res, next) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalContacts = await ContactRequest.countDocuments();
        const newContacts = await ContactRequest.countDocuments({ status: 'new' });
        const totalUsers = await User.countDocuments();
        const recentContacts = await ContactRequest.find()
            .sort({ createdAt: -1 })
            .limit(5);

        const stats = {
            totalProducts,
            totalContacts,
            newContacts,
            totalUsers,
            recentContacts,
        };

        sendSuccess(res, 200, 'Dashboard statistics retrieved successfully', stats);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
    getAllProducts,
    getAllContacts,
    getContactById,
    updateContactStatus,
    deleteContact,
    getDashboardStats,
};
