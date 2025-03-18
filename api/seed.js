require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const Image = require('../schemas/imageSchema');
const connectDB = require('./config/db');

connectDB();

const categories = ['family', 'youth', 'forgivers'];

async function getImagesData() {
  const imagesData = [];

  for (const category of categories) {
    const dirPath = path.join(__dirname, '../../assets', category);
    const files = fs.readdirSync(dirPath);

    for (const item of files) {
      if (path.extname(item).toLowerCase() === '.webp') {
        const filePath = path.join(dirPath, item);
        const imageData = fs.readFileSync(filePath).toString('base64');
        const contentType = mime.lookup(filePath);

        imagesData.push({
          category,
          filename: item,
          data: imageData,
          contentType,
          uploadDate: new Date(),
        });
      }
    }
  }

  return imagesData;
}

async function seedImages() {
  try {
    const images = await getImagesData();

    await Image.deleteMany({});
    await Image.insertMany(images);

    console.log('🌟 Images successfully seeded into MongoDB Atlas!');
  } catch (error) {
    console.error('Error seeding images:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedImages();
