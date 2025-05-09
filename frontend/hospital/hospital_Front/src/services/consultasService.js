import api from './api';
import { api2 } from './api';

export const getConsultas = async () => {
  try {
    const response = await api.get('/consultas');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener consultas';
  }
};

export const getConsultaById = async (id) => {
  try {
    const response = await api.get(`/consultas/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener la consulta';
  }
};

export const createConsulta = async (consultaData) => {
  try {
    const response = await api2.post('/consultas', consultaData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al crear la consulta';
  }
};

export const updateConsulta = async (id, consultaData) => {
  try {
    const response = await api2.put(`/consultas/${id}`, consultaData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al actualizar la consulta';
  }
};

export const deleteConsulta = async (id) => {
  try {
    const response = await api.delete(`/consultas/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al eliminar la consulta';
  }
};

export const getConsultasByMedico = async (medicoId) => {
  try {
    const response = await api.get(`/consultas/medico/${medicoId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener consultas por médico';
  }
};