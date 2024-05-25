const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, paymentController.createPayment);
router.get('/:id', authMiddleware, paymentController.getPaymentById);

module.exports = router;
