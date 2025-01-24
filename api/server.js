const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Journey = require('../schemas/journeySchema');
const MultilingualContent = require('../schemas/languageSchema');
const MultilingualMenuContent = require('../schemas/menuSchema');

const app = express();
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());

// Ensure environment variables are set
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI environment variable not set.');
  process.exit(1);
}

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// API endpoint to get all journeys
app.get('/api/journeys', async (req, res) => {
  try {
    const journeys = await Journey.find();
    res.json(journeys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API endpoint to get all languages
app.get('/api/languages', async (req, res) => {
  try {
    const languages = await MultilingualContent.find();
    res.json(languages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API endpoint to get all menus
app.get('/api/menus', async (req, res) => {
  try {
    const menus = await MultilingualMenuContent.find();
    /* console.log('menus server', menus); */
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Default route for health check or confirmation
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
