import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // Setze die Basis-URL entsprechend deiner Backend-URL
  timeout: 10000,
});

class MealService {
  constructor() {
    this.token = null;
  }

  setAuthToken(token) {
    this.token = token;
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
    }
  }

  getAuthHeader() {
    return { 'Authorization': `Bearer ${this.token}` };
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
        // interpret 404 as no data found
        return [];
      }

      throw error;
    }
  }

  async createMeal(mealData) {
    try {
      const response = await this.handleRequest(
        apiClient.post('/meals', mealData, {
          headers: this.getAuthHeader(),
        })
      );
      console.log('Created Meal:', response);
      return response;
    } catch (error) {
      console.error('Error creating meal:', error);
      throw error;
    }
  }

  async updateMeal(mealId, mealData) {
    try {
      const response = await this.handleRequest(
        apiClient.put(`/meals/${mealId}`, mealData, {
          headers: this.getAuthHeader(),
        })
      );
      console.log('Updated Meal:', response);
      return response;
    } catch (error) {
      console.error('Error updating meal:', error);
      throw error;
    }
  }

  async deleteMeal(mealId) {
    try {
      await this.handleRequest(
        apiClient.delete(`/meals/${mealId}`, {
          headers: this.getAuthHeader(),
        })
      );
      console.log('Deleted Meal with ID:', mealId);
    } catch (error) {
      console.error('Error deleting meal:', error);
      throw error;
    }
  }

  async getMealsByUser() {
    try {
      const response = await this.handleRequest(
        apiClient.get('/meals/user', {
          headers: this.getAuthHeader(),
        })
      );
      console.log('User Meals:', response);
      return response;
    } catch (error) {
      console.error('Error fetching user meals:', error);
      throw error;
    }
  }

  async getMealsByUserAndDate(date) {
    try {
      const response = await this.handleRequest(
        apiClient.get('/meals/user/date', {
          params: { date },
          headers: this.getAuthHeader(),
        })
      );
      console.log(`User Meals on ${date}:`, response);
      return response;
    } catch (error) {
      console.error(`Error fetching user meals on ${date}:`, error);
      throw error;
    }
  }
}

export default MealService;
