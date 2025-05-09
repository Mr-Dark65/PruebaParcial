<template>
  <div>
    <DataTable
      :headers="['ID', 'Nombre', 'Acciones']"
      :items="especialidades"
      @edit="editEspecialidad"
      @delete="handleDeleteEspecialidad"
    />

    <ModalForm 
      :show="showModal" 
      :title="currentEspecialidad.id ? 'Editar Especialidad' : 'Nueva Especialidad'"
      @close="closeModal" 
      @save="saveEspecialidad"
    >
      <template #form>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Nombre</label>
          <input 
            v-model="currentEspecialidad.nombre" 
            class="w-full p-2 border rounded" 
            placeholder="Nombre de la especialidad"
            required
          />
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
      currentEspecialidad: {
        id: null,
        nombre: ""
      }
    };
  },
  computed: {
    ...mapState("admin", ["especialidades"])
  },
  created() {
    this.fetchEspecialidades();
  },
  methods: {
    ...mapActions("admin", [
      "fetchEspecialidades",
      "createEspecialidad",
      "updateEspecialidad",
      "deleteEspecialidad"
    ]),
    openModal() {
      this.resetCurrentEspecialidad();
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    editEspecialidad(especialidad) {
      this.currentEspecialidad = { ...especialidad };
      this.showModal = true;
    },
    async saveEspecialidad() {
      try {
        if (this.currentEspecialidad.id) {
          await this.updateEspecialidad(this.currentEspecialidad);
        } else {
          await this.createEspecialidad(this.currentEspecialidad);
        }
        await this.fetchEspecialidades();
        this.closeModal();
      } catch (error) {
        console.error('Error al guardar especialidad:', error);
        alert('Ocurrió un error al guardar la especialidad');
      }
    },
    async handleDeleteEspecialidad(id) {
      if (confirm('¿Eliminar esta especialidad?')) {
        await this.deleteEspecialidad(id);
        await this.fetchEspecialidades();
      }
    },
    resetCurrentEspecialidad() {
      this.currentEspecialidad = {
        id: null,
        nombre: ""
      };
    }
  }
};
</script>