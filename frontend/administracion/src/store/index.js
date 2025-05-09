import { createStore } from 'vuex';
import authModule from './modules/auth';
import adminModule from './modules/admin';

export default createStore({
  modules: {
    auth: authModule,
    admin: adminModule
  }
});