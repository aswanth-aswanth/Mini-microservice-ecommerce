const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Get all users
router.get('/', authMiddleware.verifyToken, userController.getAllUsers);

// Get user by ID
router.get('/:id', authMiddleware.verifyToken, userController.getUserById);

module.exports = router;