import axios from 'axios';

export const fetchDashboardData = async (location) => {
  const response = await axios.get('/api/dashboard', {
    params: {
      lat: location?.lat || 28.6,
      lon: location?.lon || 77.2
    }
  });
  return response.data;
};
