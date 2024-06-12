<template>
  <aside class="admin-sidebar">
    <div class="sidebar-header">
      <img src="path/to/logo.png" alt="Admin Logo" class="sidebar-logo" />
      <h2 class="sidebar-title">Admin Panel</h2>
    </div>
    <ul class="sidebar-menu">
      <li :class="{ active: activeItem === 'Dashboard' }" @click="setActive('Dashboard')">
        <router-link to="/admin" class="sidebar-link"><i class="bi bi-house-door-fill"></i>Dashboard</router-link>
      </li>
      <li :class="{ active: activeItem === 'Karyawan' }" @click="toggleSubmenu('Karyawan')">
        <a class="sidebar-link">
          <div class="menu-content">
            <i class="bi bi-people-fill"></i>
            <span class="menu-text">Karyawan</span>
          </div>
          <i :class="{'bi-chevron-left': true, 'rotated': activeSubmenu === 'Karyawan'}" class="submenu-icon"></i>
        </a>
        <ul v-if="activeSubmenu === 'Karyawan'" class="sidebar-submenu">
          <li :class="{ active: activeItem === 'Data Jabatan' }" @click="setActive('Data Jabatan')">
            <router-link to="/admin/karyawan/datajabatan" class="sidebar-link">Data Jabatan</router-link>
          </li>
          <li :class="{ active: activeItem === 'Data Karyawan' }" @click="setActive('Data Karyawan')">
            <router-link to="/admin/karyawan/datakaryawan" class="sidebar-link">Data Karyawan</router-link>
          </li>
        </ul>
      </li>
      <li :class="{ active: activeItem === 'Data Kehadiran' }" @click="setActive('Data Kehadiran')">
        <router-link to="/admin/kehadiran" class="sidebar-link"><i class="bi bi-clipboard2-fill"></i>Data Kehadiran</router-link>
      </li>
      <li :class="{ active: activeItem === 'Lembur dan Cuti' }" @click="setActive('Lembur dan Cuti')">
        <router-link to="/admin/lemburcuti" class="sidebar-link"><i class="bi bi-calendar2-fill"></i>Lembur dan Cuti</router-link>
      </li>
      <li :class="{ active: activeItem === 'Gaji' }" @click="setActive('Gaji')">
        <router-link to="/admin/gaji" class="sidebar-link"><i class="bi bi-wallet"></i>Gaji</router-link>
      </li>
      <li :class="{ active: activeItem === 'Laporan' }" @click="setActive('Laporan')">
        <router-link to="/admin/laporan" class="sidebar-link"><i class="bi bi-card-text"></i>Laporan</router-link>
      </li>
      <li :class="{ active: activeItem === 'Pengaturan' }" @click="setActive('Pengaturan')">
        <router-link to="/admin/pengaturan" class="sidebar-link"><i class="bi bi-gear-fill"></i>Pengaturan</router-link>
      </li>
      <!-- Add more admin sidebar links here -->
    </ul>
    <div class="sidebar-footer">
      <a @click="showLogoutPopup" class="sidebar-link logout-link"><i class="bi bi-box-arrow-right"></i>Logout</a>
    </div>
    
    <!-- Logout Popup -->
    <div v-if="showPopup" class="popup-overlay" @click.self="hideLogoutPopup">
      <div class="popup-content">
        <h3>Konfirmasi Logout</h3>
        <p>Apakah Anda yakin ingin keluar?</p>
        <button @click="logout" class="confirm-button">Ya</button>
        <button @click="hideLogoutPopup" class="cancel-button">Tidak</button>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'AdminSidebar',
  data() {
    return {
      activeItem: '',
      activeSubmenu: '',
      showPopup: false
    };
  },
  methods: {
    setActive(item) {
      this.activeItem = item;
    },
    toggleSubmenu(item) {
      this.activeSubmenu = this.activeSubmenu === item ? '' : item;
    },
    showLogoutPopup() {
      this.showPopup = true;
    },
    hideLogoutPopup() {
      this.showPopup = false;
    },
    logout() {
      // Implement logout logic here
      console.log('Logging out...');
      this.hideLogoutPopup();
    }
  }
};
</script>

<style scoped>
.admin-sidebar {
  width: 250px;
  background-color: #3a4d60;
  color: #ecf0f1;
  padding: 20px;
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.sidebar-logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.sidebar-title {
  font-size: 1.5rem;
  color: #ecf0f1;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 15px;
}

.sidebar-link {
  text-decoration: none;
  color: #ecf0f1;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.menu-content {
  display: flex;
  align-items: center;
}

.menu-text {
  text-align: start;
  margin-left: 10px;
}

.sidebar-link i {
  margin-right: 10px;
}

.submenu-icon {
  transition: transform 0.3s ease;
  margin-left: auto;
}

.rotated {
  transform: rotate(-90deg);
}

.sidebar-link:hover {
  background-color: #34495e;
}

.active .sidebar-link {
  background-color: #1abc9c;
  color: #ffffff;
}

.sidebar-submenu {
  list-style: none;
  padding-left: 20px;
  margin-top: 10px;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #ecf0f1;
}

.logout-link {
  cursor: pointer;
}

/* Popup styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
  animation: fadeIn 0.3s;
}

.popup-content {
  background: #054fb0;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  animation: zoomIn 0.3s;
}


.confirm-button, .cancel-button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-button {
  background-color: #1abc9c;
  color: #fff;
}

.cancel-button {
  background-color: #e74c3c;
  color: #fff;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes zoomIn {
  from { transform: scale(0.5); }
  to { transform: scale(1); }
}
</style>
