const mongoose = require('mongoose');

const languageContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  beginJourney: { type: String, required: true },
  about: { type: String, required: true },
  settings: { type: String, required: true },
  footer: { type: String, required: true },
  selectLanguage: { type: String, required: true },
});

const multilingualSchema = new mongoose.Schema({
  en: { type: languageContentSchema, required: true },
  hu: { type: languageContentSchema, required: true },
  ger: { type: languageContentSchema, required: true },
  esp: { type: languageContentSchema, required: true },
});

const MultilingualContent = mongoose.model(
  'MultilingualContent',
  multilingualSchema
);

module.exports = MultilingualContent;
