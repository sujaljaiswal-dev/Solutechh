const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

// Apply auth and admin middleware to all routes
router.use(authMiddleware, adminMiddleware);

// Product Management
/**
 * GET /api/admin/products
 * Get all products
 */
router.get('/products', adminController.getAllProducts);

/**
 * POST /api/admin/products
 * Add new product
 */
router.post(
    '/products',
    upload.single('image'),
    [
        body('name').trim().notEmpty().withMessage('Product name is required'),
        body('description')
            .trim()
            .notEmpty()
            .withMessage('Description is required'),
        body('category')
            .isIn(['CSSD', 'Modular OT', 'Skill Labs', 'Pneumatic System', 'Other'])
            .withMessage('Invalid category'),
    ],
    adminController.addProduct
);

/**
 * PUT /api/admin/products/:id
 * Update product
 */
router.put(
    '/products/:id',
    upload.single('image'),
    [
        body('name').optional().trim(),
        body('description').optional().trim(),
        body('category').optional().isIn(['CSSD', 'Modular OT', 'Skill Labs', 'Pneumatic System', 'Other']),
    ],
    adminController.updateProduct
);

/**
 * DELETE /api/admin/products/:id
 * Delete product
 */
router.delete('/products/:id', adminController.deleteProduct);

/**
 * PATCH /api/admin/products/:id/toggle
 * Toggle product active/inactive status
 */
router.patch('/products/:id/toggle', adminController.toggleProductStatus);

// Contact Request Management
/**
 * GET /api/admin/contacts
 * Get all contact requests
 */
router.get('/contacts', adminController.getAllContacts);

/**
 * GET /api/admin/contacts/:id
 * Get single contact request
 */
router.get('/contacts/:id', adminController.getContactById);

/**
 * PATCH /api/admin/contacts/:id
 * Update contact request status
 */
router.patch(
    '/contacts/:id',
    [
        body('status')
            .isIn(['new', 'read', 'responded'])
            .withMessage('Invalid status'),
        body('notes').optional().trim(),
    ],
    adminController.updateContactStatus
);

/**
 * DELETE /api/admin/contacts/:id
 * Delete contact request
 */
router.delete('/contacts/:id', adminController.deleteContact);

// Dashboard Statistics
/**
 * GET /api/admin/dashboard
 * Get dashboard statistics
 */
router.get('/dashboard', adminController.getDashboardStats);

module.exports = router;
