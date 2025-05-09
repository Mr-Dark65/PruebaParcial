<template>
  <div class="p-6 pl-64">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Gestión de Empleados</h1>
      <button 
        @click="$refs.empleadosComponent.openModal()" 
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        + Nuevo Empleado
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-md p-4">
      <Empleados ref="empleadosComponent" />
    </div>
  </div>
</template>

<script>
import Empleados from '@/components/admin/Empleados.vue';

export default {
  components: { Empleados }
};
</script>
