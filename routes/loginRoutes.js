// routes/loginRoutes.js

const express = require('express');
const router = express.Router();

// Import the user controller
const loginController = require('../controllers/loginController');

// Define a route to login
router.post('/login', loginController.login);


module.exports = router;
