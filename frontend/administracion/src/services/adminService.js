import axios from 'axios';

const API_URL = 'http://localhost:3000/api/admin';
const PAI_URL = 'http://localhost:3001/api';

// Centros Médicos
const getCentros = () => axios.get(`${API_URL}/centros`);
const createCentro = (centro) => axios.post(`${PAI_URL}/centros`, centro);
const updateCentro = (id, centro) => axios.put(`${API_URL}/centros/${id}`, centro);
const deleteCentro = (id) => axios.delete(`${API_URL}/centros/${id}`);

// Empleados
const getEmpleados = () => axios.get(`${PAI_URL}/empleados`);
const createEmpleado = (empleado) => axios.post(`${PAI_URL}/empleados`, empleado);
const updateEmpleado = (id, empleado) => axios.put(`${PAI_URL}/empleados/${id}`, empleado);
const deleteEmpleado = (id) => axios.delete(`${API_URL}/empleados/${id}`);

// Especialidades
const getEspecialidades = () => axios.get(`${API_URL}/especialidades`);
const createEspecialidad = (especialidad) => axios.post(`${PAI_URL}/especialidades`, especialidad);
const updateEspecialidad = (id, especialidad) => axios.put(`${PAI_URL}/especialidades/${id}`, especialidad);
const deleteEspecialidad = (id) => axios.delete(`${API_URL}/especialidades/${id}`);

// Médicos
const getMedicos = () => axios.get(`${PAI_URL}/medicos`);
const createMedico = (medico) => axios.post(`${PAI_URL}/medicos`, medico);
const updateMedico = (id, medico) => axios.put(`${PAI_URL}/medicos/${id}`, medico);
const deleteMedico = (id) => axios.delete(`${API_URL}/medicos/${id}`);

export default {
  getCentros, createCentro, updateCentro, deleteCentro,
  getEmpleados, createEmpleado, updateEmpleado, deleteEmpleado,
  getEspecialidades, createEspecialidad, updateEspecialidad, deleteEspecialidad,
  getMedicos, createMedico, updateMedico, deleteMedico
};