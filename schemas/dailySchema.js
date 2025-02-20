const mongoose = require('mongoose');

const dailyContentSchema = new mongoose.Schema({
  date: { type: String, required: true },
  day_of_week: { type: String, required: true },
  special_day: { type: String, required: false, default: '' },
  gospel: { type: String, required: true },
  reflection_question: { type: String, required: true },
  prayer: { type: String, required: true },
});

const multilingualDailySchema = new mongoose.Schema(
  {
    en: { type: [dailyContentSchema], required: true },
    hu: { type: [dailyContentSchema], required: true },
    ger: { type: [dailyContentSchema], required: true },
    esp: { type: [dailyContentSchema], required: true },
  },
  { collection: 'Daily' }
);

const MultilingualDailyContent = mongoose.model(
  'MultilingualDailyContent',
  multilingualDailySchema
);

module.exports = MultilingualDailyContent;
