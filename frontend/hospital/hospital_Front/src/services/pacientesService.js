import api from './api';

export const getPacientes = async () => {
  try {
    const response = await api.get('/pacientes');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener pacientes';
  }
};

export const getPacienteById = async (id) => {
  try {
    const response = await api.get(`/pacientes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener el paciente';
  }
};

export const createPaciente = async (pacienteData) => {
  try {
    const response = await api.post('/pacientes', pacienteData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al crear el paciente';
  }
};

export const updatePaciente = async (id, pacienteData) => {
  try {
    const response = await api.put(`/pacientes/${id}`, pacienteData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al actualizar el paciente';
  }
};

export const deletePaciente = async (id) => {
  try {
    const response = await api.delete(`/pacientes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al eliminar el paciente';
  }
};

export const searchPacientes = async (searchTerm) => {
  try {
    const response = await api.get(`/pacientes/search?term=${searchTerm}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al buscar pacientes';
  }
};