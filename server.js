const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rice-recipes';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
const recipesRouter = require('./routes/recipes');
app.use('/api/recipes', recipesRouter);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Rice Recipes API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});