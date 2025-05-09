<template>
    <nav class="bg-white shadow-md p-4 flex justify-between items-center pl-64">
      <h1 class="text-xl font-bold">Sistema Hospitalario - Administración</h1>
      <div>
        <span class="mr-4">{{ user.nombre }}</span>
        <button @click="logout" class="text-red-500">Cerrar sesión</button>
      </div>
    </nav>
  </template>
  
  <script>
  import { mapActions, mapState } from 'vuex';
  
  export default {
    computed: {
      ...mapState('auth', ['user'])
    },
    methods: {
      ...mapActions('auth', ['logout'])
    }
  };
  </script>