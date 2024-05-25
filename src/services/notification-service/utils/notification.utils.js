exports.validateNotification = (notification) => {
    if (!notification.userId || !notification.message) {
        throw new Error('Missing required fields: userId, message');
    }
};
