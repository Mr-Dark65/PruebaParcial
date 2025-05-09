<template>
  <div>
    <DataTable
      :headers="[
        'ID',
        'Nombre',
        'Apellido',
        'Correo',
        'Especialidad',
        'Centro Médico',
        'Acciones',
      ]"
      :items="medicosFormateados"
      @edit="editMedico"
      @delete="handleDeleteMedico"
      @add="openModal"
    />

    <ModalForm
      :show="showModal"
      :title="currentMedico.id ? 'Editar Médico' : 'Nuevo Médico'"
      @close="closeModal"
      @save="saveMedico"
    >
      <template #form>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Centro Médico</label>
          <select
            v-model="currentMedico.id_centro_medico"
            class="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccione un centro</option>
            <option
              v-for="centro in centros"
              :key="centro.id"
              :value="centro.id"
            >
              {{ centro.nombre }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Especialidad</label>
          <select
            v-model="currentMedico.id_especialidad"
            class="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccione una especialidad</option>
            <option
              v-for="especialidad in especialidades"
              :key="especialidad.id"
              :value="especialidad.id"
            >
              {{ especialidad.nombre }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Nombre</label>
          <input
            v-model="currentMedico.nombre"
            class="w-full p-2 border rounded"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Apellido</label>
          <input
            v-model="currentMedico.apellido"
            class="w-full p-2 border rounded"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Correo</label>
          <input
            v-model="currentMedico.correo"
            type="email"
            class="w-full p-2 border rounded"
            required
          />
        </div>

        <div class="mb-4" v-if="!currentMedico.id">
          <label class="block text-gray-700 mb-2">Rol</label>
          <select
            v-model="currentMedico.rol"
            class="w-full p-2 border rounded"
            required
          >
            <option value="medico">Médico</option>
            <option value="cirujano">Cirujano</option>
          </select>
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
      currentMedico: {
        id: null,
        nombre: "",
        apellido: "",
        correo: "",
        id_centro_medico: null,
        id_especialidad: null,
        rol: "medico",
      },
    };
  },
  computed: {
    ...mapState("admin", ["medicos", "especialidades", "centros"]),
    medicosFormateados() {
      return this.medicos.map((med) => ({
        ...med,
        especialidad: med.especialidad || "N/A",
        centro_medico: med.centro_medico || "N/A",
      }));
    },
  },
  created() {
    this.fetchMedicos();
    this.fetchEspecialidades();
    this.fetchCentros();
  },
  methods: {
    ...mapActions("admin", [
      "fetchMedicos",
      "createMedico",
      "updateMedico",
      "deleteMedico",
      "fetchEspecialidades",
      "fetchCentros",
    ]),
    openModal() {
      this.resetCurrentMedico();
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    editMedico(medico) {
      this.currentMedico = { ...medico };
      this.showModal = true;
    },
    async saveMedico() {
  try {
    if (
      !this.currentMedico.nombre ||
      !this.currentMedico.apellido ||
      !this.currentMedico.correo
    ) {
      throw new Error("Nombre, apellido y correo son requeridos");
    }

    // Preparar los datos para enviar
    const medicoData = {
      nombre: this.currentMedico.nombre.trim(),
      apellido: this.currentMedico.apellido.trim(),
      correo: this.currentMedico.correo.trim(),
      id_centro_medico: parseInt(this.currentMedico.id_centro_medico),
      id_especialidad: parseInt(this.currentMedico.id_especialidad),
    };

    // Agregar rol solo si es creación (no edición)
    if (!this.currentMedico.id) {
      medicoData.rol = this.currentMedico.rol || "medico";
    }

    if (isNaN(medicoData.id_especialidad)) {
      throw new Error("Seleccione una especialidad válida");
    }
    if (isNaN(medicoData.id_centro_medico)) {
      throw new Error("Seleccione un centro médico válido");
    }

    console.log("Datos a enviar al backend:", medicoData);

    if (this.currentMedico.id) {
      // actualización
      await this.$store.dispatch("admin/updateMedico", {
  id: this.currentMedico.id,
  ...medicoData,
});

    } else {
      // creación
      await this.$store.dispatch("admin/createMedico", medicoData);
    }

    await this.$store.dispatch("admin/fetchMedicos");
    this.closeModal();

    this.$notify({
      type: "success",
      title: "Éxito",
      text: `Médico ${this.currentMedico.id ? "actualizado" : "creado"} correctamente`,
    });
  } catch (error) {
    console.error("Error al guardar médico:", error);

    this.$notify({
      type: "error",
      title: "Error",
      text: error.response?.data?.message || error.message || "Error al guardar el médico",
    });
  }
},

    async handleDeleteMedico(id) {
      if (confirm("¿Eliminar este médico?")) {
        await this.deleteMedico(id);
        await this.fetchMedicos();
      }
    },
    resetCurrentMedico() {
      this.currentMedico = {
        id: null,
        nombre: "",
        apellido: "",
        correo: "",
        id_centro_medico: null,
        id_especialidad: null,
        rol: "medico",
      };
    },
  },
};
</script>
