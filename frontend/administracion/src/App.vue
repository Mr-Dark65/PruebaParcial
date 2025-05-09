<template>
  <div v-if="isAuthenticated">
    <Navbar />
    <div class="flex">
      <Sidebar />
      <main class="p-4 w-full">
        <router-view />
      </main>
    </div>
  </div>
  <router-view v-else />
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import { mapState } from 'vuex';

export default {
  components: { Navbar, Sidebar },
  computed: {
    ...mapState('auth', ['isAuthenticated'])
  }
};
</script>