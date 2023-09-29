// routes/userRoutes.js

const express = require('express');
const router = express.Router();

// Import the user controller
const userController = require('../controllers/userController');

// Import middleware
const mw = require('../middleware/my-middleware');

// Apply GET middleware
router.get('/users', mw.authenticateToken);

// Define a route to get all users
router.get('/users', userController.getUsers);

// Define a route to get a user by ID
router.get('/users/:id', userController.getUserById);

// Define a route to create a new user
router.post('/users', userController.createUser);


module.exports = router;
