const { ObjectId } = require('mongodb');

// Add a new movie
const addMovie = async (req, res) => {
  const db = req.app.locals.db;
  const movie = req.body;
  try {
    const result = await db.collection('moviedb').insertOne(movie);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to add movie' });
  }
};

// Get all movies
const getAllMovies = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const movies = await db.collection('moviedb').find().toArray();
    res.status(200).json(movies);
  } catch (error) {
    res.status (500).json({ error: 'Failed to get movies' });
  }
};

// Get a single movie by ID
const getSingleMovie = async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.query;

  try {
  
      const movie = await db.collection('moviedb').findOne({ _id:ObjectId.createFromHexString(String(id.trim())) });
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get movie' });
  }
};

// Get paginated movies
const getPaginatedMovies = async (req, res) => {
  const db = req.app.locals.db;
  const { page = 1, size = 10 } = req.query;
  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(size, 10);

  try {
    const movies = await db.collection('moviedb')
      .find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get movies' });
  }
};

module.exports = {
  addMovie,
  getAllMovies,
  getSingleMovie,
  getPaginatedMovies
};
