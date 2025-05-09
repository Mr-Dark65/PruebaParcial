<template>
  <aside class="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white shadow-xl flex flex-col">
    <!-- Logo/Header -->
    <div class="p-6 border-b border-gray-700">
      <h1 class="text-xl font-bold text-white">Sistema Hospitalario</h1>
      <p class="text-sm text-gray-400 mt-1">Panel de Administración</p>
    </div>

    <!-- Menú Principal -->
    <nav class="flex-1 overflow-y-auto py-4">
      <ul class="space-y-1 px-4">
        <li>
          <router-link 
            to="/" 
            class="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            active-class="bg-blue-600 hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link 
            to="/centros" 
            class="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            active-class="bg-blue-600 hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Centros Médicos
          </router-link>
        </li>
        <li>
          <router-link 
            to="/empleados" 
            class="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            active-class="bg-blue-600 hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Empleados
          </router-link>
        </li>
        <li>
          <router-link 
            to="/especialidades" 
            class="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            active-class="bg-blue-600 hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Especialidades
          </router-link>
        </li>
        <li>
          <router-link 
            to="/medicos" 
            class="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            active-class="bg-blue-600 hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Médicos
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'AppSidebar'
}
</script>

<style scoped>
/* Estilo para scrollbar en navegadores WebKit */
nav::-webkit-scrollbar {
  width: 6px;
}
nav::-webkit-scrollbar-track {
  background: transparent;
}
nav::-webkit-scrollbar-thumb {
  background: #4B5563;
  border-radius: 3px;
}
nav::-webkit-scrollbar-thumb:hover {
  background: #6B7280;
}
</style>