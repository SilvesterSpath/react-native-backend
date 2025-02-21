const express = require('express');
const MultilingualDailyContent = require('../schemas/dailySchema'); // Adjust if needed
const authenticateJWT = require('../middlewares/auth');

const router = express.Router();

// Public route - Get all daily content
router.get('/', async (req, res) => {
  try {
    const dailyContent = await MultilingualDailyContent.find();
    res.json(dailyContent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected route - Example
router.get('/protected', authenticateJWT, async (req, res) => {
  res.json({ message: 'You have accessed a protected route', user: req.user });
});

module.exports = router;
