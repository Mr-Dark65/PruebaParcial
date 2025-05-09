import { api3 } from "./api";

export const getMedicos = async () => {
  try {
    const response = await api3.get('/medicos');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener médicos';
  }
};

export const getMedicoById = async (id) => {
  try {
    const response = await api3.get(`/medicos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener el médico';
  }
};

export const createMedico = async (medicoData) => {
  try {
    const response = await api3.post('/medicos', medicoData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al crear el médico';
  }
};

export const updateMedico = async (id, medicoData) => {
  try {
    const response = await api3.put(`/medicos/${id}`, medicoData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al actualizar el médico';
  }
};

export const deleteMedico = async (id) => {
  try {
    const response = await api3.delete(`/medicos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al eliminar el médico';
  }
};

export const getMedicosByEspecialidad = async (especialidadId) => {
  try {
    const response = await api.get(`/medicos/especialidad/${especialidadId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener médicos por especialidad';
  }
};

export const getMedicosByCentroMedico = async (centroMedicoId) => {
  try {
    const response = await api.get(`/medicos/centro-medico/${centroMedicoId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener médicos por centro médico';
  }
};