const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
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

// Create Journey Schema
const journeySchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    description: String,
    icon: String,
    stations: [
      {
        id: Number,
        title: String,
        prayer: String,
        reflection: String,
        familyActivity: String,
        supportNote: String,
        personalPrompt: String,
        image: String,
      },
    ],
  },
  { collection: 'Journeys' }
);

const Journey = mongoose.model('Journey', journeySchema);

// API endpoint to get all journeys
app.get('/api/journeys', async (req, res) => {
  try {
    const journeys = await Journey.find();
    res.json(journeys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Default route for health check or confirmation
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
