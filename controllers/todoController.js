// controllers/todoController.js

const Todo = require('../models/todo');
const User = require('../models/user');

// Function to create a new todo
const createTodo = async (req, res) => {

    const { title, description, date, userId} = req.body;

    try {

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: `User with id '${userId}' not found` });
        }

        
        // Create a new todo
        const todo = new Todo({
            title,
            description,
            date,
            user: userId
        });



        const todoToSave = await todo.save();
        res.status(201).json(todoToSave);
    } catch (err) {
        res.status(500).json({ message: 'Error creating todo', error: err.message });
    }
};

// Function to get all todos
const getTodos =  async (req, res) => {

    const user = req.user;

    try {
        const todos = await Todo.find({user: user._id});

        if (todos.length === 0) {
            return res.status(404).json({ message: 'todos not found' });
        }
        
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving todos', error: err.message });
    }
};

// Function to get todo details by id
const getTodoById = async (req, res) => {
    const id = req.params.id;

    const user = req.user;

    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: `Todo with id '${id}' not found` });
        }

        if (todo.user !== user._id) {
            return res.status(401).json({ message: 'this is not your resource'});
        }

        res.status(200).json(todo);

    } catch (err) {
        res.status(500).json({ message: 'Error retrieving todo', error: err.message });
    }
};

// Update a todo item by ID
const updateTodo = async (req, res) => {
    const { id } = req.params; // Get the ID of the todo item to update
    const { title, description, date } = req.body; // Get updated data from the request body
    const user = req.user;

    try {
      // Find the todo item by ID
      const todo = await Todo.findById(id);
  
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      if (todo.user !== user._id) {
        return res.status(401).json({ message: 'this is not your resource'});
    }
  
      // Update the todo item with the new data
      todo.title = title;
      todo.description = description;
      todo.date = date;
  
      // Save the updated todo item
      const updatedTodo = await todo.save();
  
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(500).json({ message: 'Error updating todo', error: error.message });
    }
  };



module.exports = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo
};
