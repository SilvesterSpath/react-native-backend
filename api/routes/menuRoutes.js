const express = require('express');
const MultilingualMenuContent = require('../../schemas/menuSchema'); // Adjust if needed
const authenticateJWT = require('../middlewares/auth');

const router = express.Router();

// Public route - Get all menu content
router.get('/', async (req, res) => {
  try {
    const menus = await MultilingualMenuContent.find();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected route - Example
router.get('/protected', authenticateJWT, async (req, res) => {
  res.json({
    message: 'You have accessed a protected menu route',
    user: req.user,
  });
});

module.exports = router;
