<template>
  <nav class="sidebar">
    <ul>
      <li>
        <router-link to="/" active-class="active-link">Home</router-link>
      </li>
      <li>
        <router-link to="/leave" active-class="active-link">Leave</router-link>
      </li>
      <li>
        <router-link to="/payroll" active-class="active-link">Payroll</router-link>
      </li>
    </ul>
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
