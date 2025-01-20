const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
