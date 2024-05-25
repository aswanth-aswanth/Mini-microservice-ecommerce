const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, reviewController.createReview);
router.get('/:id', authMiddleware, reviewController.getReviewById);
router.get('/product/:productId', authMiddleware, reviewController.getReviewsByProductId);

module.exports = router;
