const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/jwt.utils');

// Mock user data
const users = [
  { id: 1, username: 'user1', password: '$2a$10$cW6kc5xdVOBm/refNDdHeeiKRzYQKBRXDdkRvRdXmhGbZwBaAd3OO' },
  { id: 2, username: 'user2', password: '$2a$10$cW6kc5xdVOBm/refNDdHeeiKRzYQKBRXDdkRvRdXmhGbZwBaAd3OO' },
];

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
  };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Verify the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Generate a JWT token
  const token = generateToken(user.id, user.username);

  res.status(200).json({ token });
};

exports.verifyToken = (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
};