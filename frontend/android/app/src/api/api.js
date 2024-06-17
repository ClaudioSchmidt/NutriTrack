// src/api/api.js
import axios from 'axios';

// Setze die Basis-URL für dein Spring Boot Backend
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Passe die URL nach Bedarf an
  timeout: 10000,
});

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const authenticateUser = async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      try {
        console.log('Response:', response);
        const { token } = response.data;
        setAuthToken(token); // Token in den Headers setzen
        return token;
      } catch (error) {
        console.error('Error parsing response:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      throw error;
    }
  };

export const fetchTrackings = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
