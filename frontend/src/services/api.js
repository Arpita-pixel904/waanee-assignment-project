import axios from 'axios';

// Vite mein .env variables load karne ke liye VITE_ prefix zaroori hai
// Update this line in api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🛠️ Request Interceptor: Har API call se pehle Token attach karne ke liye [cite: 53]
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Backend JWT Middleware se directly sync hoga [cite: 53]
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🛠️ Response Interceptor: Agar Token expire ho jaye (401 Unauthorized), toh user ko logout karne ke liye
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // User ko direct login par redirect karenge
    }
    return Promise.reject(error);
  }
);

export default api;