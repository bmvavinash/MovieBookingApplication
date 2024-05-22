const express = require('express');
const router = express.Router();
const { bookSeats } = require('../controllers/bookingController');

router.post('/', bookSeats);

module.exports = router;
