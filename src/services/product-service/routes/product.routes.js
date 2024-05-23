const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Get all products
router.get('/', authMiddleware.verifyToken, productController.getAllProducts);

// Get product by ID
router.get('/:id', authMiddleware.verifyToken, productController.getProductById);

// Create a new product
router.post('/', authMiddleware.verifyToken, productController.createProduct);

module.exports = router;