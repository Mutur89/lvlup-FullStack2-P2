// src/config/axios.ts
import axios from 'axios';

// Base URL del backend Spring Boot
const API_BASE_URL = 'http://localhost:8080';

// Crear instancia de axios
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT a todas las peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si recibimos un 401 (Unauthorized), limpiamos el token y redirigimos al login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Opcionalmente, podrías redirigir al login aquí
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
export { API_BASE_URL };
