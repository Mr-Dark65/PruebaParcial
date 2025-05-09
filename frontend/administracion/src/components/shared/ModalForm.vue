<template>
  <transition name="modal">
    <div v-if="show" class="modal-overlay fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div class="modal-content py-4 px-6">
          <div class="flex justify-between items-center pb-3">
            <h3 class="text-lg font-bold">{{ title }}</h3>
            <button @click="$emit('close')" class="modal-close">
              &times;
            </button>
          </div>
          
          <slot name="form"></slot>
          
          <div class="flex justify-end pt-4 space-x-3">
            <button 
              @click="$emit('close')" 
              class="px-4 py-2 text-gray-500 hover:text-gray-700"
            >
              Cancelar
            </button>
            <button 
              @click="$emit('save')" 
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: Boolean,
    title: {
      type: String,
      default: 'Formulario'
    }
  },
  emits: ['close', 'save']
}
</script>

<style scoped>
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: translateY(-20px);
}
</style>