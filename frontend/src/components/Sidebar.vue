<template>
  <nav class="sidebar">
    <ul>
      <li>
        <router-link to="/" active-class="active-link">
          <i class="bi bi-house-door"></i> Home
        </router-link>
      </li>
      <li>
        <router-link to="/leave" active-class="active-link">
          <i class="bi bi-calendar"></i> Leave
        </router-link>
      </li>
      <li>
        <router-link to="/payroll" active-class="active-link">
          <i class="bi bi-cash-stack"></i> Payroll
        </router-link>
      </li>
      <li>
        <router-link to="/profile" active-class="active-link">
          <i class="bi bi-person"></i> Profile
        </router-link>
      </li>
    </ul>
    <div class="logout">
      <router-link to="/login" active-class="active-link">
        <i class="bi bi-box-arrow-right"></i> Logout
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<style scoped>
@import "./sidebarStyles.css";
</style>
