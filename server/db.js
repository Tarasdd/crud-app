const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;