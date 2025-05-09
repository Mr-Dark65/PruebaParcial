<template>
  <div class="space-y-6">
    <!-- Data Table Container -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <DataTable
        :headers="[
          'ID',
          'Nombre',
          'Apellido',
          'Correo',
          'Cargo',
          'Centro Médico',
          'Acciones',
        ]"
        :items="empleadosFormateados"
        @edit="editEmpleado"
        @delete="handleDeleteEmpleado"
        class="rounded-lg"
      />
    </div>

    <!-- Modal Form -->
    <ModalForm 
      :show="showModal" 
      :title="currentEmpleado.id ? 'Editar Empleado' : 'Nuevo Empleado'"
      @close="closeModal" 
      @save="saveEmpleado"
      size="lg"
    >
      <template #form>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Columna 1 -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Centro Médico</label>
              <select 
                v-model="currentEmpleado.id_centro_medico" 
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="" disabled>Seleccione un centro</option>
                <option 
                  v-for="centro in centros" 
                  :key="centro.id" 
                  :value="centro.id"
                  class="hover:bg-blue-50"
                >
                  {{ centro.nombre }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input 
                v-model="currentEmpleado.nombre" 
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Ingrese el nombre"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
              <input 
                v-model="currentEmpleado.apellido" 
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Ingrese el apellido"
              />
            </div>
          </div>

          <!-- Columna 2 -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input 
                v-model="currentEmpleado.correo" 
                type="email" 
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="ejemplo@dominio.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
              <input 
                v-model="currentEmpleado.cargo" 
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Especifique el cargo"
              />
            </div>

            <div v-if="!currentEmpleado.id">
              <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña Temporal</label>
              <input 
                type="password" 
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Generar automáticamente"
                disabled
              />
              <p class="mt-1 text-xs text-gray-500">Se generará una contraseña temporal automáticamente</p>
            </div>
          </div>
        </div>
      </template>
    </ModalForm>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DataTable from "@/components/shared/DataTable.vue";
import ModalForm from "@/components/shared/ModalForm.vue";

export default {
  components: { DataTable, ModalForm },
  data() {
    return {
      showModal: false,
      currentEmpleado: {
        id: null,
        nombre: "",
        apellido: "",
        correo: "",
        cargo: "",
        id_centro_medico: null,
        rol: ""
      }
    };
  },
  computed: {
    ...mapState("admin", ["empleados", "centros"]),
    empleadosFormateados() {
      return this.empleados.map(emp => ({
        ...emp,
        // Formatear datos si es necesario
      }));
    }
  },
  async created() {
    await Promise.all([
      this.fetchEmpleados(),
      this.fetchCentros()
    ]);
  },
  methods: {
    ...mapActions("admin", [
      "fetchEmpleados",
      "createEmpleado",
      "updateEmpleado",
      "deleteEmpleado",
      "fetchCentros"
    ]),
    
    openModal() {
      this.resetCurrentEmpleado();
      this.showModal = true;
    },
    
    closeModal() {
      this.showModal = false;
    },
    
    editEmpleado(empleado) {
      this.currentEmpleado = { ...empleado };
      this.showModal = true;
    },
    
    async saveEmpleado() {
      try {
        if (this.currentEmpleado.id) {
          await this.updateEmpleado(this.currentEmpleado);
          this.$toast.success('Empleado actualizado correctamente');
        } else {
          await this.createEmpleado(this.currentEmpleado);
          this.$toast.success('Empleado creado correctamente');
        }
        await this.fetchEmpleados();
        this.closeModal();
      } catch (error) {
        console.error('Error al guardar empleado:', error);
        this.$toast.error('Ocurrió un error al guardar el empleado');
      }
    },
    
    async handleDeleteEmpleado(id) {
      this.$swal.fire({
        title: '¿Eliminar empleado?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        backdrop: `
          rgba(0,0,0,0.4)
          url("/images/alert-animation.gif")
          left top
          no-repeat
        `
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.deleteEmpleado(id);
            await this.fetchEmpleados();
            this.$toast.success('Empleado eliminado correctamente');
          } catch (error) {
            this.$toast.error('Error al eliminar el empleado');
          }
        }
      });
    },
    
    resetCurrentEmpleado() {
      this.currentEmpleado = {
        id: null,
        nombre: "",
        apellido: "",
        correo: "",
        cargo: "",
        id_centro_medico: null,
      };
    }
  }
};
</script>

<style scoped>
/* Transiciones suaves para inputs */
input, select {
  transition: all 0.2s ease-in-out;
}

/* Estilo para el select */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
</style>