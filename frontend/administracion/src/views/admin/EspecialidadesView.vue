<template>
  <div class="p-6 pl-64">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Gestión de Especialidades Médicas</h1>
      <button 
        @click="openModal" 
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        + Nueva Especialidad
      </button>
    </div>

    <!-- Contenedor de Especialidades -->
    <div class="bg-white rounded-lg shadow-md p-4">
      <Especialidades ref="especialidadesComponent" />
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 class="text-xl font-bold mb-4">Nueva Especialidad</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="nombre" class="block text-gray-700">Nombre de Especialidad</label>
            <input 
              type="text" 
              id="nombre" 
              v-model="nuevaEspecialidad.nombre" 
              class="w-full p-2 border border-gray-300 rounded mt-1" 
              required 
            />
          </div>
          <div class="flex justify-between">
            <button 
              type="button" 
              @click="closeModal" 
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              :disabled="loading"
            >
              <span v-if="loading">Guardando...</span>
              <span v-else>Guardar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Especialidades from '@/components/admin/Especialidades.vue';

export default {
  components: { Especialidades },
  data() {
    return {
      isModalOpen: false,
      loading: false,
      nuevaEspecialidad: {
        nombre: '',
      }
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.nuevaEspecialidad.nombre = ''; // Limpiar el campo
    },
    async handleSubmit() {
      try {
        this.loading = true;
        
        // Validación simple
        if (!this.nuevaEspecialidad.nombre.trim()) {
          alert('Por favor ingrese un nombre válido');
          return;
        }

        // Llamar a la acción de Vuex para crear la especialidad
        await this.$store.dispatch('admin/createEspecialidad', {
          nombre: this.nuevaEspecialidad.nombre.trim()
        });

        // Actualizar la lista de especialidades en el componente hijo
        await this.$refs.especialidadesComponent.fetchEspecialidades();
        
        // Cerrar modal y mostrar feedback
        this.closeModal();
        this.$notify({
          type: 'success',
          title: 'Éxito',
          text: 'Especialidad creada correctamente'
        });
      } catch (error) {
        console.error('Error al crear especialidad:', error);
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'No se pudo crear la especialidad. ' + (error.response?.data?.message || '')
        });
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>