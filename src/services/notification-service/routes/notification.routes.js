const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, notificationController.createNotification);
router.get('/:id', authMiddleware, notificationController.getNotificationById);

module.exports = router;
