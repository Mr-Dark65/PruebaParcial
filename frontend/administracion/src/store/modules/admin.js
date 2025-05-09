import adminService from '@/services/adminService';

const state = {
  centros: [],
  empleados: [],
  especialidades: [],
  medicos: [],
  loading: false,
  error: null
};

const mutations = {
  SET_CENTROS(state, centros) {
    state.centros = centros;
  },
  SET_EMPLEADOS(state, empleados) {
    state.empleados = empleados;
  },
  SET_ESPECIALIDADES(state, especialidades) {
    state.especialidades = especialidades;
  },
  SET_MEDICOS(state, medicos) {
    state.medicos = medicos;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  }
};

const actions = {
  // Centros Médicos
  async fetchCentros({ commit }) {
    commit('SET_LOADING', true);
    try {
      const response = await adminService.getCentros();
      commit('SET_CENTROS', response.data);
    } catch (error) {
      commit('SET_ERROR', error.message);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async createCentro({ commit, dispatch }, centro) {
    try {
      await adminService.createCentro(centro);
      dispatch('fetchCentros');
    } catch (error) {
      commit('SET_ERROR', error.message);
      throw error;
    }
  },
  async updateCentro({ commit, dispatch }, centro) {
    try {
      await adminService.updateCentro(centro.id, centro);
      dispatch('fetchCentros');
    } catch (error) {
      commit('SET_ERROR', error.message);
      throw error;
    }
  },
  async deleteCentro({ commit, dispatch }, id) {
    try {
      await adminService.deleteCentro(id);
      dispatch('fetchCentros');
    } catch (error) {
      commit('SET_ERROR', error.message);
      throw error;
    }
  },

  // Empleados
  async fetchEmpleados({ commit }) {
    commit('SET_LOADING', true);
    try {
      const response = await adminService.getEmpleados();
      commit('SET_EMPLEADOS', response.data);
    } catch (error) {
      commit('SET_ERROR', error.message);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async createEmpleado({ commit, dispatch }, empleado) {
    try {
      await adminService.createEmpleado(empleado);
      dispatch('fetchEmpleados');
    } catch (error) {
      commit('SET_ERROR', error.message);
      throw error;
    }
  },
  async updateEmpleado({ commit, dispatch }, empleado) {
    try {
      await adminService.updateEmpleado(empleado.id, empleado);
      dispatch('fetchEmpleados');
    } catch (error) {
      commit('SET_ERROR', error.message);
      throw error;
    }
  },
  async deleteEmpleado({ commit, dispatch }, id) {
    try {
      await adminService.deleteEmpleado(id);
      dispatch('fetchEmpleados');
    } catch (error) {
      commit('SET_ERROR', error.message);
      throw error;
    }
  },

  // Especialidades
  async fetchEspecialidades({ commit }) {
    commit('SET_LOADING', true);
    try {
      const response = await adminService.getEspecialidades();
      commit('SET_ESPECIALIDADES', response.data);
    } catch (error) {
      commit('SET_ERROR', error.message);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async createEspecialidad({ commit, dispatch }, especialidad) {
    try {
      await adminService.createEspecialidad(especialidad);
      dispatch('fetchEspecialidades');
    } catch (error) {
      commit('SET_ERROR', error.message);
      throw error;
    }
  },
  async updateEspecialidad({ commit, dispatch }, especialidad) {
    try {
      await adminService.updateEspecialidad(especialidad.id, especialidad);
      dispatch('fetchEspecialidades');
    } catch (error) {
      commit('SET_ERROR', error.message);
      throw error;
    }
  },
  async deleteEspecialidad({ commit, dispatch }, id) {
    try {
      await adminService.deleteEspecialidad(id);
      dispatch('fetchEspecialidades');
    } catch (error) {
      commit('SET_ERROR', error.message);
      throw error;
    }
  },

  // Médicos
  async fetchMedicos({ commit }) {
    commit('SET_LOADING', true);
    try {
      const response = await adminService.getMedicos();
      commit('SET_MEDICOS', response.data);
    } catch (error) {
      commit('SET_ERROR', error.message);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async createMedico({ commit, dispatch }, medico) {
    try {
      await adminService.createMedico(medico);
      dispatch('fetchMedicos');
    } catch (error) {
      commit('SET_ERROR', error.message);
      throw error;
    }
  },
  async updateMedico({ commit, dispatch }, medico) {
    try {
      await adminService.updateMedico(medico.id, medico);
      dispatch('fetchMedicos');
    } catch (error) {
      commit('SET_ERROR', error.message);
      throw error;
    }
  },
  async deleteMedico({ commit, dispatch }, id) {
    try {
      await adminService.deleteMedico(id);
      dispatch('fetchMedicos');
    } catch (error) {
      commit('SET_ERROR', error.message);
      throw error;
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
