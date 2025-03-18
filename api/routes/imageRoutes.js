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

// Public route - Get an image by filename
router.get('/file/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const image = await Image.findOne({ filename });

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const imgBuffer = Buffer.from(image.data, 'base64'); // Decode base64
    res.setHeader('Content-Type', image.contentType); // Set correct MIME type
    res.send(imgBuffer); // Send the binary data as a response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Public route - Get images by category
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const images = await Image.find({ category });

    if (!images.length) {
      return res.status(404).json({ message: 'No images found' });
    }

    // Convert images into a structured object like familyImages
    const imageMap = {};
    images.forEach((image) => {
      imageMap[
        image.filename
      ] = `data:${image.contentType};base64,${image.data}`;
    });

    res.json(imageMap); // Return JSON object instead of raw binary
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Public route - Get an image by category and filename
router.get('/:category/:filename', async (req, res) => {
  try {
    const { category, filename } = req.params;
    const image = await Image.findOne({ category, filename });

    if (!image) {
      return res
        .status(404)
        .json({ message: 'Image not found in the given category' });
    }

    const imgBuffer = Buffer.from(image.data, 'base64'); // Decode base64
    res.setHeader('Content-Type', image.contentType); // Set correct MIME type
    res.send(imgBuffer); // Send the binary data as a response
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
