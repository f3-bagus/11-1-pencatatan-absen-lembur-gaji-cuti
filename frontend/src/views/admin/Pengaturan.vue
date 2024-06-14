<template>
  <div class="pengaturan">
    <h1>Pengaturan Sistem Admin</h1>

    <div class="pengaturan-section">
      <h2>Pengaturan Akun Admin</h2>
      <form @submit.prevent="updateAdminAccount">
        <div class="form-group">
          <label for="adminName">Nama Admin</label>
          <input type="text" id="adminName" v-model="adminAccount.name" placeholder="Masukkan nama admin" required />
        </div>
        <div class="form-group">
          <label for="adminEmail">Email Admin</label>
          <input type="email" id="adminEmail" v-model="adminAccount.email" placeholder="Masukkan email admin" required />
        </div>
        <div class="form-group">
          <label for="adminPassword">Password Baru</label>
          <input type="password" id="adminPassword" v-model="adminAccount.password" placeholder="Masukkan password baru" />
        </div>
        <button type="submit" class="submit-button">Update Akun</button>
      </form>
    </div>

    <div class="pengaturan-section">
      <h2>Pengaturan Notifikasi</h2>
      <form @submit.prevent="updateNotifications">
        <div class="form-group">
          <label>
            <input type="checkbox" v-model="notifications.email" /> Email Notifikasi
          </label>
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" v-model="notifications.sms" /> SMS Notifikasi
          </label>
        </div>
        <button type="submit" class="submit-button">Update Notifikasi</button>
      </form>
    </div>

    <div class="pengaturan-section">
      <h2>Pengaturan Umum</h2>
      <form @submit.prevent="updateGeneralSettings">
        <div class="form-group">
          <label for="language">Bahasa</label>
          <select id="language" v-model="generalSettings.language">
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
            <!-- Tambahkan opsi bahasa lainnya jika diperlukan -->
          </select>
        </div>
        <div class="form-group">
          <label for="timezone">Zona Waktu</label>
          <select id="timezone" v-model="generalSettings.timezone">
            <option value="WIB">WIB</option>
            <option value="WITA">WITA</option>
            <option value="WIT">WIT</option>
            <!-- Tambahkan opsi zona waktu lainnya jika diperlukan -->
          </select>
        </div>
        <button type="submit" class="submit-button">Update Pengaturan</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pengaturan',
  data() {
    return {
      adminAccount: {
        name: '',
        email: '',
        password: ''
      },
      notifications: {
        email: false,
        sms: false
      },
      generalSettings: {
        language: 'id',
        timezone: 'WIB'
      }
    };
  },
  methods: {
    updateAdminAccount() {
      // Tambahkan logika untuk memperbarui akun admin
      alert('Akun admin diperbarui');
    },
    updateNotifications() {
      // Tambahkan logika untuk memperbarui pengaturan notifikasi
      alert('Pengaturan notifikasi diperbarui');
    },
    updateGeneralSettings() {
      // Tambahkan logika untuk memperbarui pengaturan umum
      alert('Pengaturan umum diperbarui');
    }
  }
};
</script>

<style scoped>
.pengaturan {
  font-family: 'Arial', sans-serif;
  background-color: #f0f4f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pengaturan h1 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
}

h1 {
  font-size: 2em; 
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
}

.pengaturan-section {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin-bottom: 20px;
}

.pengaturan-section h2 {
  font-size: 1.5em;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"],
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
