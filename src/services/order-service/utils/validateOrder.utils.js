exports.validateOrder = (order) => {
    if (!order.productId || !order.quantity || !order.userId) {
        throw new Error('Missing required fields: productId, quantity, userId');
    }
};
