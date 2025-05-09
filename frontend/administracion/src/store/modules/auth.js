import authService from '@/services/authService';

const state = {
  isAuthenticated: false,
  user: null
};

const mutations = {
  SET_AUTH(state, { user, isAuthenticated }) {
    state.user = user;
    state.isAuthenticated = isAuthenticated;
  },
  LOGOUT(state) {
    state.user = null;
    state.isAuthenticated = false;
  }
};

const actions = {
  async login({ commit }, { email, password }) {
    try {
      const response = await authService.login(email, password);
      commit('SET_AUTH', { user: response.user, isAuthenticated: true });
      localStorage.setItem('token', response.token);
      localStorage.setItem('usuario', JSON.stringify(response.user)); // Guarda el usuario también
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  async logout({ commit }) {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/login';
    commit('LOGOUT');
  },

  initializeAuth({ commit }) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('usuario');
    if (token && user) {
      commit('SET_AUTH', { user: JSON.parse(user), isAuthenticated: true });
    }
  }
};


export default {
  namespaced: true,
  state,
  mutations,
  actions
};