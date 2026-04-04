import { getWeatherByCity } from '../services/weather.service.js';

export const checkWeather = async (req, res) => {
  try {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({ success: false, message: 'Please provide a city name.' });
    }

    const weatherData = await getWeatherByCity(city);

    // Return clean response JSON
    res.status(200).json(weatherData);

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong while fetching weather data.'
    });
  }
};
