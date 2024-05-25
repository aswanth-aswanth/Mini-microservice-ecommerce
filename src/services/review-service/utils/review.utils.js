exports.validateReview = (review) => {
    if (!review.userId || !review.productId || !review.content) {
        throw new Error('Missing required fields: userId, productId, content');
    }
};
