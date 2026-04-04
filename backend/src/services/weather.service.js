import axios from 'axios';

export const getWeatherByCity = async (cityName) => {
  // Step 1: Geocoding via Open-Meteo (No API Key Required!)
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
  const geoResponse = await axios.get(geoUrl);

  if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
    throw new Error('City not found. Please provide a valid city name.');
  }

  // Extract Latitude and Longitude
  const { latitude, longitude } = geoResponse.data.results[0];

  // Step 2: Fetch Real-Time Weather via Open-Meteo
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation`;
  const weatherResponse = await axios.get(weatherUrl);
  
  const data = weatherResponse.data;

  const temperature = data.current?.temperature_2m || 0;
  const rain = data.current?.precipitation || 0;

  return {
    city: cityName,
    temperature,
    rain
  };
};
