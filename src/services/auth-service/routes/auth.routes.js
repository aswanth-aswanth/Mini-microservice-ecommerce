const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Register a new user
router.post('/register', authController.registerUser);

// Login
router.post('/login', authController.loginUser);

// Verify JWT token
router.get('/verify', authMiddleware.verifyToken, authController.verifyToken);

module.exports = router;