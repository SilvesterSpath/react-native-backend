const mongoose = require('mongoose');

// Define the Journey Schema
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

module.exports = Journey;
