const mongoose = require('mongoose');

const menuContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  main_title: { type: String, required: true },
  station_name: { type: String, required: true },
  prayer_short: { type: String, required: true },
  prayer_long: { type: String, required: true },
  previous: { type: String, required: true },
  next: { type: String, required: true },
  close: { type: String, required: true },
  change_journey: { type: String, required: true },
  reflection: { type: String, required: true },
  reference: { type: String, required: true },
  subtitle: { type: String, required: true },
  beginJourney: { type: String, required: true },
  about: { type: String, required: true },
  settings: { type: String, required: true },
  footer: { type: String, required: true },
  selectLanguage: { type: String, required: true },
});

const multilingualMenuSchema = new mongoose.Schema(
  {
    en: { type: menuContentSchema, required: true },
    hu: { type: menuContentSchema, required: true },
    ger: { type: menuContentSchema, required: true },
    esp: { type: menuContentSchema, required: true },
  },
  { collection: 'Menus' }
);

const MultilingualMenuContent = mongoose.model(
  'MultilingualMenuContent',
  multilingualMenuSchema
);

module.exports = MultilingualMenuContent;
