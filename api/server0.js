const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Journey = require('../schemas/journeySchema');
const MultilingualMenuContent = require('../schemas/menuSchema');
const MultilingualDailyContent = require('../schemas/dailySchema');

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
    /*    console.log('🚀 Route hit: /api/journeys');

    console.log('📡 Journey model collection name:', Journey.collection.name);
    console.log(
      '📡 Mongoose connection state:',
      mongoose.connection.readyState
    ); */

    const journeys = await Journey.find();
    /* console.log('✅ Fetched journeys:', journeys); */

    res.json(journeys);
  } catch (error) {
    console.error('❌ Error fetching journeys:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// API endpoint to get all daily content
app.get('/api/daily', async (req, res) => {
  try {
    const daily = await MultilingualDailyContent.find();
    res.json(daily);
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

app.get('/api/test', async (req, res) => {
  try {
    console.log('🔍 Checking MongoDB state:', mongoose.connection.readyState);

    if (mongoose.connection.readyState !== 1) {
      console.error('❌ MongoDB is NOT connected!');
      return res.status(500).json({ message: 'Database is not connected' });
    }

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(
      '✅ Available Collections:',
      collections.map((c) => c.name)
    );

    if (!collections.some((c) => c.name === 'Journeys')) {
      console.error("❌ Collection 'journeys' does not exist!");
      return res.status(500).json({ message: 'Collection does not exist' });
    }

    const count = await db.collection('Journeys').countDocuments();
    /*     const sampleData = await db.collection('Journeys').findOne();
    console.log('Sample Journey:', sampleData); */
    console.log('✅ Test Query Result:', count);
    res.json({ totalJourneys: count });
  } catch (error) {
    console.error('❌ Test Query Error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
