const express = require('express');
const Image = require('../../schemas/imageSchema'); // Adjust if needed
const authenticateJWT = require('../middlewares/auth');

const router = express.Router();

// Public route - Get all images
router.get('/', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Public route - Get images by category
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const images = await Image.find({ category });
    if (images.length === 0) {
      return res
        .status(404)
        .json({ message: 'No images found for this category' });
    }
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected route - Example
router.get('/protected', authenticateJWT, async (req, res) => {
  res.json({
    message: 'You have accessed a protected image route',
    user: req.user,
  });
});

module.exports = router;
