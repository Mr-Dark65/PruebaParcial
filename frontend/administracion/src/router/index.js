import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Auth/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import CentrosView from '@/views/admin/CentrosView.vue';
import EmpleadosView from '@/views/admin/EmpleadosView.vue';
import EspecialidadesView from '@/views/admin/EspecialidadesView.vue';
import MedicosView from '@/views/admin/MedicosView.vue';
import store from '@/store';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { 
    path: '/', 
    name: 'Dashboard', 
    component: Dashboard,
    meta: { requiresAuth: true, roles: ['admin', 'medico', 'empleado'] }  // Aceptar múltiples roles
  },
  { 
    path: '/centros', 
    name: 'CentrosView', 
    component: CentrosView,
    meta: { requiresAuth: true, roles: ['admin'] }  // Solo admin
  },
  { 
    path: '/empleados', 
    name: 'EmpleadosView', 
    component: EmpleadosView,
    meta: { requiresAuth: true, roles: ['admin'] }  // Solo admin
  },
  { 
    path: '/especialidades', 
    name: 'EspecialidadesView', 
    component: EspecialidadesView,
    meta: { requiresAuth: true, roles: ['admin'] }  // Solo admin
  },
  { 
    path: '/medicos', 
    name: 'MedicosView', 
    component: MedicosView,
    meta: { requiresAuth: true, roles: ['admin', 'medico'] }  // Admin y Medico
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.auth.isAuthenticated;
  const userRole = store.state.auth.user?.rol;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.roles && !to.meta.roles.includes(userRole)) {  // Verificar si el rol del usuario es válido
    next('/');  // Redirigir a la página principal si el rol no es permitido
  } else {
    next();
  }
});

export default router;
