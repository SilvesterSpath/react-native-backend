const mongoose = require('mongoose');

const menuContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
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
