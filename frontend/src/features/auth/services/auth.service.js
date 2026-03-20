import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return {
    user: response.data.data,
    token: response.data.token,
  };
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return {
    user: response.data.data,
    token: response.data.token,
  };
};
