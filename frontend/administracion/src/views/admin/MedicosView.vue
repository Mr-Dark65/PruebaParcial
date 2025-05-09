<template>
  <div class="p-6 pl-64">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Gestión de Médicos</h1>
      <button 
        @click="$refs.medicosComponent.openModal()" 
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        + Nuevo Médico
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-md p-4">
      <Medicos ref="medicosComponent" />
    </div>
  </div>
</template>

<script>
import Medicos from '@/components/admin/Medicos.vue';

export default {
  components: { Medicos },
  
  // Opcional: Si necesitas manejar algo específico en la vista
  methods: {
    // Puedes agregar métodos específicos de la vista aquí
  },
  
  // Opcional: Si necesitas cargar datos al montar la vista
  mounted() {
    // Puedes realizar acciones al montar el componente aquí
  }
};
</script>

<style scoped>
/* Estilos específicos para la vista si son necesarios */
</style>