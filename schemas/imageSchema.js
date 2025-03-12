const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['family', 'youth', 'forgivers'],
  },
  filename: { type: String, required: true },
  data: { type: String, required: true }, // Base64 encoded image
  contentType: { type: String, required: true }, // e.g., 'image/jpeg'
  uploadDate: { type: Date, default: Date.now },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
