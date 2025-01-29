const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  prayer1: { type: String, required: true },
  prayer2: { type: String },
  reflection1: { type: String },
  reflection2: { type: String },
  reference: { type: String },
  image: { type: String, required: true },
});

const journeySchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  stations: { type: [stationSchema], required: true },
});

const multilingualJourneySchema = new mongoose.Schema(
  {
    hu: { type: [journeySchema], required: true },
    en: { type: [journeySchema], required: true },
    ger: { type: [journeySchema], required: true },
  },
  { collection: 'Journeys__' }
);

const Journey = mongoose.model('Journey', multilingualJourneySchema);

module.exports = Journey;
