// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const authenticate = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');

// Public endpoints
router.get('/', controller.getProducts);
router.get('/:id', controller.getProductById);

// Protected routes (require token)
router.post('/', authenticate, validateProduct, controller.createProduct);

// Update product (protected)
router.put('/:id', authenticate, controller.updateProduct);

// Delete product (protected)
router.delete('/:id', authenticate, controller.deleteProduct);

module.exports = router;
