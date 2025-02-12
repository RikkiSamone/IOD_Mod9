const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password_hash } = req.body;
    const hashedPassword = await bcrypt.hash(password_hash, 10);
    const newUser = await User.create({ username, email, password_hash: hashedPassword });

    const token = jwt.sign({ id: newUser.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password_hash } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password_hash, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};