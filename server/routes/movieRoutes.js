const express = require('express');
const router = express.Router();
const { getMovies, getSeats } = require('../controllers/movieController');

router.get('/', getMovies);
router.get('/seats/:movie', getSeats);

module.exports = router;
