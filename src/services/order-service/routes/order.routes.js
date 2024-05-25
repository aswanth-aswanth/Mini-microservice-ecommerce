const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware.verifyToken, orderController.createOrder);
router.get('/:id', authMiddleware.verifyToken, orderController.getOrderById);
router.put('/:id', authMiddleware.verifyToken, orderController.updateOrderStatus);

module.exports = router;
