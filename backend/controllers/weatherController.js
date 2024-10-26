const axios = require('axios');
const config = require('../utils/config');

exports.getWeatherData = async (req, res) => {
  const { location } = req.query;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${config.WEATHER_API_KEY}`;
  
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
};
