const express = require('express');
const connectDB = require('./db');
require('dotenv').config();

const app = express();

// Підключення до бази даних
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});