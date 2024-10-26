const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Route to get weather data based on location
router.get('/', weatherController.getWeatherData);

module.exports = router;
