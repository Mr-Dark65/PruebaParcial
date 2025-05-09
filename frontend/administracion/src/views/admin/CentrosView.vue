<template>
  <div class="min-h-screen bg-gray-100 py-10 px-5 pl-64">
    <div class="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <!-- Título y Botón de Nuevo Centro -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-wide">
          Gestión de Centros Médicos
        </h1>
        <button 
          @click="openModal" 
          class="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          + Nuevo Centro
        </button>
      </div>

      <!-- Contenedor de Centros Médicos -->
      <div class="overflow-hidden bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-gray-50">
        <CentrosMedicos ref="centrosComponent" />
      </div>
    </div>
  </div>
</template>

<script>
import CentrosMedicos from '@/components/admin/CentrosMedicos.vue';

export default {
  components: { CentrosMedicos },
  methods: {
    openModal() {
      // Emitimos al componente hijo para que abra el modal
      this.$refs.centrosComponent.openModal();
    }
  }
};
</script>

<style scoped>

</style>
