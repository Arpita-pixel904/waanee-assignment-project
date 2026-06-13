import api from './api';

const authService = {
  // 1. Register User API Call [cite: 42]
  register: async (name, email, password, role) => {
    const response = await api.post('/auth/register', { name, email, password, role });
    return response.data; // Includes: success, message, token, user
  },

  // 2. Login User API Call [cite: 43]
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // 3. Logout User API Call [cite: 45]
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout API error:', error.message);
    } finally {
      // API fail ho ya pass, client-side se storage clear hona zaroori hai
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
};

export default authService;