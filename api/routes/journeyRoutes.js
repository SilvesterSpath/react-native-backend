const express = require('express');
const Journey = require('../../schemas/journeySchema');
const authenticateJWT = require('../middlewares/auth');

const router = express.Router();

// Public route - Get all journey content
router.get('/', async (req, res) => {
  try {
    const journeys = await Journey.find();
    res.json(journeys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Example of a protected route
router.get('/protected', authenticateJWT, async (req, res) => {
  res.json({
    message: 'You have accessed a protected journey route',
    user: req.user,
  });
});

module.exports = router;
