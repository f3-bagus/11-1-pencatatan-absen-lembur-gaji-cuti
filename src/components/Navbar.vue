<template>
  <nav class="navbar fixed-top">
    <div class="container-fluid">
      <h3 class="navbar-brand">Logo</h3>
      <div class="profile d-flex align-items-center">
        <p class="mb-0 me-3">Annisa</p>
        <div class="notifikasi position-relative">
          <i class="bi bi-bell" style="font-size: 1.5rem; color: white;"></i>
          <span class="badge">3</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
@import "./NavbarStyles.css";
</style>
