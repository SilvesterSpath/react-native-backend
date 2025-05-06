const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../schemas/userSchema');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      firstname,
      lastname,
    });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, firstname: user.firstname });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get User Data
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// Forgot Password - Step 1: Check user exists
router.post('/forgot-password', async (req, res) => {
  try {
    const { email, firstname } = req.body;
    const user = await User.findOne({ email, firstname });
    // For security, always return success message
    if (!user) {
      return res
        .status(200)
        .json({ message: 'If the user exists, you can reset the password.' });
    }
    // User exists, allow frontend to proceed
    return res
      .status(200)
      .json({ message: 'User found. You can reset the password.' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing request.' });
  }
});

// Forgot Password - Step 2: Reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, firstname, newPassword } = req.body;
    const user = await User.findOne({ email, firstname });
    if (!user) {
      // For security, do not reveal user existence
      return res.status(400).json({ message: 'Invalid request.' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password.' });
  }
});

module.exports = router;
