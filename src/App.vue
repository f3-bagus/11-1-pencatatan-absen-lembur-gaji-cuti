<template>
  <div id="app">
    <component :is="navbarComponent" />
    <component :is="sidebarComponent" />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import AdminNavbar from './components/AdminNavbar.vue';
import AdminSidebar from './components/AdminSidebar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    AdminNavbar,
    AdminSidebar,
  },
  computed: {
    isAdminRoute() {
      return this.$route.path.startsWith('/admin');
    },
    navbarComponent() {
      return this.isAdminRoute ? 'AdminNavbar' : 'Navbar';
    },
    sidebarComponent() {
      return this.isAdminRoute ? 'AdminSidebar' : 'Sidebar';
    },
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  margin-left: 250px;
  padding: 20px;
  flex: 1;
  margin-top: 60px; 
}

.sidebar {
  margin-top: 60px; 
}
</style>
