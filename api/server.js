const express = require('express');
const passport = require('passport');
const connectDB = require('./config/db');
require('dotenv').config();
require('./config/passport'); // Google OAuth config

const authRoutes = require('./routes/authRoutes');
const journeyRoutes = require('./routes/journeyRoutes');
const menuRoutes = require('./routes/menuRoutes');
const dailyRoutes = require('./routes/dailyRoutes');
const imageRoutes = require('./routes/imageRoutes');
const stripeRoutes = require('./routes/stripeRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB(); // Connect to MongoDB

app.use('/api/auth', authRoutes);
app.use('/api/journeys', journeyRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/daily', dailyRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/payment', stripeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
