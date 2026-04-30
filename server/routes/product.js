const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

/**
 * GET /api/products
 * Get all products with filters
 */
router.get('/', productController.getAllProducts);

/**
 * GET /api/products/:id
 * Get single product by ID
 */
router.get('/:id', productController.getProductById);

module.exports = router;
