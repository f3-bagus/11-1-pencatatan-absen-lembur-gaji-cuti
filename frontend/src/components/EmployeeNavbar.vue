<template>
  <nav class="navbar fixed-top">
    <div class="container-fluid">
      <h3 class="navbar-brand">Logo</h3>
      <div class="profile d-flex align-items-center">
        <p class="mb-0 me-3" @click="goToProfile" style="cursor: pointer;">{{userInfo.name ? userInfo.name : "NO NAME"}}</p>
        <div class="notifikasi position-relative" @click="goToNotifications" style="cursor: pointer;">
          <i class="bi bi-bell" style="font-size: 1.5rem; color: white;"></i>
          <span class="badge" v-if="notifications.length">{{notifications.length > 99 ? "99+" : notifications.length}}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  // data() {
  //   let profileName = localStorage.getItem('name');
  //   if (!profileName || profileName === "")
  //     profileName = "NO NAME";

  //   return {
  //     profileName
  //   };
  // },
  computed: {
    ...mapState(['userInfo', 'notifications'])
  },
  name: 'Navbar',
  methods: {
    goToProfile() {
      this.$router.push('/profile');
    },
    goToNotifications() {
      this.$router.push('/notifications');
    }
  }
};
</script>

<style scoped>
@import "./EmployeeNavbarStyles.css";
</style>
