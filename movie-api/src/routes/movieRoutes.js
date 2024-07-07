const express = require('express');
const router = express.Router();
const { addMovie, getAllMovies, getSingleMovie, getPaginatedMovies } = require('../controllers/movieController');

router.post('/add-movie', addMovie);
router.get('/get-all', getAllMovies);
router.get('/get-single', getSingleMovie);
router.get('/get-paginated', getPaginatedMovies);

module.exports = router;
