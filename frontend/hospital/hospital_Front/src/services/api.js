import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/hospital'; // Cambiar por tu URL de backend
const API_BASE_URL2 = 'http://localhost:3002/api';
const API_BASE_URL3 = 'http://localhost:3000/api/admin';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const api2 = axios.create({
  baseURL: API_BASE_URL2,
  headers: {
    'Content-Type': 'application/json',
  },
});

const api3 = axios.create({
  baseURL: API_BASE_URL3,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token a las solicitudes
api2.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para agregar la ciudad a las peticiones
api.interceptors.request.use((config) => {
  const city = localStorage.getItem('selectedCity') || 'quito';
  config.headers['X-City'] = city;
  return config;
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 500) {
      console.error('Error del servidor:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
export { api2 };
export { api3 };