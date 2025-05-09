import { api2 } from './api';

export const login = async (email, password) => {
  try {
    const response = await api2.post('/auth/login', { email, password });
    if (response.data && response.data.token && response.data.user) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data.user;
    } else {
      throw new Error('Respuesta de login inválida');
    }
  } catch (error) {
    if (error.response?.data?.message) {
      throw error.response.data.message;
    } else if (error.message) {
      throw error.message;
    } else {
      throw 'Error al iniciar sesión';
    }
  }
};

export const checkAuth = async () => {
  try {
    const response = await api2.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al verificar autenticación';
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
