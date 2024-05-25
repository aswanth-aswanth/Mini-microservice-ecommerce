const Review = require('../models/review.model');
const { sendMessage } = require('../../../rabbitmq/producer');

exports.createReview = async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();

        // Send message to RabbitMQ after saving to MongoDB
        await sendMessage('reviews', review); // 'reviews' is the queue name

        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getReviewsByProductId = async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
