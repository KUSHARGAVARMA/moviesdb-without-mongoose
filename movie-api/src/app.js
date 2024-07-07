const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const movieRoutes = require('./routes/movieRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Database connection
MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('moviedb'); // Database name
    app.locals.db = db;

    // Routes
    app.use('/api/movies', movieRoutes);

    // Start the server
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => console.error(error));
