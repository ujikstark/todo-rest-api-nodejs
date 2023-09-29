// controllers/userController.js

const User = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10; // Adjust the number of salt rounds as needed

// Function to create a new user
const createUser = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const user = new User({
      name,
      username,
      password: hashedPassword, // Store the hashed password in the database
    });

    const userToSave = await user.save();
    res.status(201).json(userToSave);
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
};


// Function to get all users
const getUsers = async (req, res) => {

    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ message: 'Users not found' });
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving users', error: err.message });
    }
};

// Function to get user by Id
const getUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: `User with id '${id}' not found` });
        }
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user', error: err.message });
    }
};


module.exports = {
    createUser,
    getUsers,
    getUserById
};

