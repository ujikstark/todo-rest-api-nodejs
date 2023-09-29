require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Import your User model

// Secret key used for signing and verifying JWT tokens
const secretKey = process.env.JWT_SECRET_KEY;

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If both username and password are valid, generate a JWT token
    const token = jwt.sign({ userId: user._id, username: user.username }, secretKey, { expiresIn: '1h' });

    // Send the token as a response
    res.status(200).json({ access_token: token });
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
};

module.exports = { login };
