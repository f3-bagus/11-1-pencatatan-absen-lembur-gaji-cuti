<template>
  <div class="pengaturan">
    <h1>Pengaturan Sistem Admin</h1>

    <div class="pengaturan-section">
      <h2>Pengaturan Akun Admin</h2>
      <form @submit.prevent="updateAdminAccount">
        <div class="form-group account">
          <label for="adminName">Nama Admin</label>
          <input type="text" id="adminName" v-model="adminAccount.name" placeholder="Masukkan nama admin" required />
        </div>
        <div class="form-group account">
          <label for="adminEmail">Email Admin</label>
          <input type="email" id="adminEmail" v-model="adminAccount.email" placeholder="Masukkan email admin" required />
        </div>
        <div class="form-group account">
          <label for="adminPassword">Password Baru</label>
          <input type="password" id="adminPassword" v-model="adminAccount.password" placeholder="Masukkan password baru" />
        </div>
        <button type="submit" class="submit-button">Update Akun</button>
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
    };
  },
  methods: {
    updateAdminAccount() {
      alert('Akun admin diperbarui');
    },
  }
};
</script>

<style scoped>
.pengaturan {
  font-family: 'Arial', sans-serif;
  background-color: #f0f4f7;
  padding: 20px;
  width: 76vw;
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

.account {
  margin-bottom: 15px;
}

.account label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.account input[type="text"],
.account input[type="email"],
.account input[type="password"],
.account select {
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
