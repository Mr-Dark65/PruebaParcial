<template>
  <div class="container mx-auto px-4 py-8">

    <!-- Data Table -->
    <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <DataTable 
        :headers="headers" 
        :items="centros" 
        @edit="editCentro" 
        @delete="confirmDelete" 
        class="rounded-lg"
      />
    </div>

    <!-- Modal Form -->
    <ModalForm 
      :show="showModal" 
      :title="currentCentro.id ? 'Editar Centro Médico' : 'Nuevo Centro Médico'"
      @close="closeModal"
      @save="saveCentro"
    >
      <template #form>
        <div class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del Centro</label>
            <input 
              v-model="currentCentro.nombre" 
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Ej: Centro Médico Norte"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Dirección Completa</label>
            <input 
              v-model="currentCentro.direccion" 
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Ej: Av. Principal 123, Ciudad"
            >
          </div>
        </div>
      </template>
    </ModalForm>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import DataTable from '@/components/shared/DataTable.vue';
import ModalForm from '@/components/shared/ModalForm.vue';

export default {
  components: { DataTable, ModalForm },
  data() {
    return {
      headers: ['ID', 'Nombre', 'Dirección', 'Acciones'],
      showModal: false,
      currentCentro: { id: null, nombre: '', direccion: '' }
    };
  },
  computed: {
    ...mapState('admin', ['centros'])
  },
  methods: {
    ...mapActions('admin', ['fetchCentros', 'createCentro', 'updateCentro', 'deleteCentro']),
    
    openModal() {
      this.showModal = true;
    },
    
    closeModal() {
      this.showModal = false;
      this.resetCurrentCentro();
    },
    
    editCentro(centro) {
      this.currentCentro = { ...centro };
      this.openModal();
    },
    
    async saveCentro() {
      try {
        if (this.currentCentro.id) {
          await this.updateCentro(this.currentCentro);
          this.$toast.success('Centro actualizado correctamente');
        } else {
          await this.createCentro(this.currentCentro);
          this.$toast.success('Centro creado correctamente');
        }
        this.closeModal();
        await this.fetchCentros();
      } catch (error) {
        console.error("Error saving centro:", error);
        this.$toast.error('Ocurrió un error al guardar el centro');
      }
    },
    
    async confirmDelete(id) {
      this.$swal.fire({
        title: '¿Eliminar centro médico?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.deleteCentro(id);
            await this.fetchCentros();
            this.$toast.success('Centro eliminado correctamente');
          } catch (error) {
            this.$toast.error('Error al eliminar el centro');
          }
        }
      });
    },
    
    resetCurrentCentro() {
      this.currentCentro = { id: null, nombre: '', direccion: '' };
    }
  },
  async created() {
    try {
      await this.fetchCentros();
    } catch (error) {
      this.$toast.error('Error al cargar los centros médicos');
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}

/* Animación para el botón */
button:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Transición para inputs */
input {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>