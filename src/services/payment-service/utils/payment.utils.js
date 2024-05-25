exports.validatePayment = (payment) => {
    if (!payment.orderId || !payment.amount || !payment.userId) {
        throw new Error('Missing required fields: orderId, amount, userId');
    }
};
