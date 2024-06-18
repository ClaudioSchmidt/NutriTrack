import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

class UserService {
  constructor() {
    this.token = null;
    this.apiClient = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
    });
  }

  setAuthToken(token) {
    this.token = token;
    if (token) {
      this.apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.apiClient.defaults.headers.common['Authorization'];
    }
  }

  async handleRequest(request) {
    try {
      const response = await request;
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      const statusCode = error.response?.status;

      console.error('API request error:', errorMessage);

      if (statusCode === 404) {
        return []; // interpret 404 as no data found
      }

      throw error;
    }
  }

  async authenticateUser(username, password) {
    try {
      const response = await this.handleRequest(
        this.apiClient.post('/auth/login', { username, password })
      );
      console.log('Response:', response);
      const { token } = response;
      this.setAuthToken(token); // Setze Token in den Headers
      return token;
    } catch (error) {
      console.error('Error during authentication:', error);
      throw error;
    }
  }

  async fetchTrackings() {
    return await this.handleRequest(
      this.apiClient.get('/users/me', {
        headers: { Authorization: `Bearer ${this.token}` },
      })
    );
  }

  async getAllUsers() {
    return await this.handleRequest(
      this.apiClient.get('/users', {
        headers: { Authorization: `Bearer ${this.token}` },
      })
    );
  }

  async getUserById(userId) {
    return await this.handleRequest(
      this.apiClient.get(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
    );
  }

  async deleteUser(userId) {
    return await this.handleRequest(
      this.apiClient.delete(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
    );
  }

  async searchUsers(keyword) {
    return await this.handleRequest(
      this.apiClient.get(`/users/search?keyword=${keyword}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
    );
  }
}

export default UserService;