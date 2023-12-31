// routes/todoRoutes.js

const express = require('express');
const router = express.Router();

// Import the user controller
const todoController = require('../controllers/todoController');

// Import middleware
const mw = require('../middleware/my-middleware');

// Apply middleware to all method on route /todos
router.all('/todos', mw.authenticateToken);

// Apply middleware to all method on route /todos/:id
router.all('/todos/:id', mw.authenticateToken);

// Define a route to get all todos
router.get('/todos', todoController.getTodos);

// Define a route to get a todo by ID
router.get('/todos/:id', todoController.getTodoById);

// Define a route to create a new user
router.post('/todos', todoController.createTodo);

// Define a route to update a todo by ID
router.put('/todos/:id', todoController.updateTodo);

// Define a route to delete a todo by ID
router.delete('/todos/:id', todoController.deleteTodo);


module.exports = router;
