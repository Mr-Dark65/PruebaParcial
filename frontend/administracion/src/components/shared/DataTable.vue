<template>
  <table class="min-w-full bg-white">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header" class="py-2 px-4 border-b text-left">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td v-for="(value, key) in item" :key="key" class="py-2 px-4 border-b">
          {{ value }}
        </td>
        <td class="py-2 px-4 border-b w-40">
          <div class="flex gap-2">
            <button 
              @click="$emit('edit', item)" 
              class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
            >
              Editar
            </button>
            <button 
              @click="$emit('delete', item.id)" 
              class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    headers: { type: Array, required: true },
    items: { type: Array, required: true }
  }
};
</script>
