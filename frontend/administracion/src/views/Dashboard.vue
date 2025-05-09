<template>
  <div class="min-h-screen bg-gray-50 p-6 pl-64">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Panel de Administración</h1>
      <p class="text-lg text-gray-500">Resumen general del sistema</p>
    </div>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Metric Card 1 -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-500">Centros Médicos</h3>
          <div class="p-2 rounded-lg bg-blue-50 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
        <p class="mt-4 text-3xl font-bold text-blue-600">{{ stats.centros }}</p>
        <p class="mt-1 text-sm text-gray-500">+2 desde ayer</p>
      </div>

      <!-- Metric Card 2 -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-500">Empleados</h3>
          <div class="p-2 rounded-lg bg-green-50 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
        <p class="mt-4 text-3xl font-bold text-green-600">{{ stats.empleados }}</p>
        <p class="mt-1 text-sm text-gray-500">+5 este mes</p>
      </div>

      <!-- Metric Card 3 -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-500">Especialidades</h3>
          <div class="p-2 rounded-lg bg-purple-50 text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="mt-4 text-3xl font-bold text-purple-600">{{ stats.especialidades }}</p>
        <p class="mt-1 text-sm text-gray-500">+3 nuevas</p>
      </div>

      <!-- Metric Card 4 -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-500">Médicos</h3>
          <div class="p-2 rounded-lg bg-orange-50 text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <p class="mt-4 text-3xl font-bold text-orange-600">{{ stats.medicos }}</p>
        <p class="mt-1 text-sm text-gray-500">+2 esta semana</p>
      </div>
    </div>

    <!-- Activity Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-800">Actividad Reciente</h2>
        <button 
          @click="refreshData"
          class="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Actualizar
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in actividad" :key="index" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(item.fecha) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.accion }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">{{ item.usuario }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
                <button class="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
                  Ver
                </button>
              </td>
            </tr>
            <tr v-if="actividad.length === 0">
              <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">No hay actividad reciente</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      actividad: [
        { fecha: '2023-11-15 10:30', accion: 'Creó un nuevo centro médico', usuario: 'admin@uta.edu.ec' },
        { fecha: '2023-11-15 09:45', accion: 'Actualizó especialidad Cardiología', usuario: 'jose.caiza@uta.edu.ec' }
      ],
      loading: {
        centros: true,
        empleados: true,
        especialidades: true,
        medicos: true
      }
    };
  },
  computed: {
    ...mapState('admin', {
      centros: state => state.centros.length,
      empleados: state => state.empleados.length,
      especialidades: state => state.especialidades.length,
      medicos: state => state.medicos.length
    }),
    stats() {
      return {
        centros: this.centros,
        empleados: this.empleados,
        especialidades: this.especialidades,
        medicos: this.medicos
      };
    }
  },
  methods: {
    ...mapActions('admin', ['fetchCentros', 'fetchEmpleados', 'fetchEspecialidades', 'fetchMedicos']),
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    },
    
    async refreshData() {
      this.loading = {
        centros: true,
        empleados: true,
        especialidades: true,
        medicos: true
      };
      
      try {
        await Promise.all([
          this.fetchCentros(),
          this.fetchEmpleados(),
          this.fetchEspecialidades(),
          this.fetchMedicos()
        ]);
      } finally {
        this.loading = {
          centros: false,
          empleados: false,
          especialidades: false,
          medicos: false
        };
      }
    }
  },
  async mounted() {
    await this.refreshData();
  }
};
</script>