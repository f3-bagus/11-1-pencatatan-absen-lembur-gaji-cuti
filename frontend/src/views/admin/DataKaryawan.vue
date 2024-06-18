<template>
  <div class="data-karyawan">
    <h1>Data Karyawan</h1>
    <div class="card">
      <div class="top-bar">
        <div class="search-container">
          <div class="search-icon-container">
            <i class="bi bi-search search-icon"></i>
          </div>
          <input type="text" v-model="searchQuery" placeholder="Search..." class="search-input" />
        </div>
      </div>

      <table class="karyawan-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Jabatan</th>
            <th>Email</th>
            <th>Nomor Telepon</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="karyawan in filteredKaryawan" :key="karyawan.id">
            <td>{{ karyawan.id }}</td>
            <td>{{ karyawan.name }}</td>
            <td>{{ karyawan.JobRole.roleName }}</td>
            <td>{{ karyawan.email }}</td>
            <td>{{ karyawan.phoneNumber }}</td>
            <td class="actions">
              <button class="action-button edit-button" @click="openEditModal(karyawan)">
                <i class="bi bi-pencil-square"></i> Edit
              </button>
              <button class="action-button delete-button" @click="deleteKaryawan(karyawan.id)">
                <i class="bi bi-trash"></i> Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="closeEditModal">&times;</span>
        <h2>Edit Karyawan</h2>
        <div class="form-group">
          <label>Nama:</label>
          <input type="text" v-model="editedKaryawan.name" />
        </div>
        <div class="form-group">
          <label>Jabatan:</label>
          <input type="text" v-model="editedKaryawan.JobRole.roleName" />
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" v-model="editedKaryawan.email" />
        </div>
        <div class="form-group">
          <label>Nomor Telepon:</label>
          <input type="text" v-model="editedKaryawan.phoneNumber" />
        </div>
        <button class="submit-button" @click="updateKaryawan">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../services/axios';

export default {
  name: 'DataKaryawan',
  data() {
    return {
      searchQuery: '',
      showEditModal: false,
      editedKaryawan: {
        id: '',
        name: '',
        JobRole: {
          roleName: ''
        },
        email: '',
        phoneNumber: ''
      },
      karyawanList: []
    };
  },
  computed: {
    filteredKaryawan() {
      return this.karyawanList.filter(karyawan =>
        karyawan.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        karyawan.JobRole.roleName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        karyawan.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        karyawan.phoneNumber.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchKaryawanData() {
      try {
        const response = await axios.get('api/v1/user/users');
        this.karyawanList = response.data.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    openEditModal(karyawan) {
      this.editedKaryawan = { ...karyawan, JobRole: { ...karyawan.JobRole } };
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    updateKaryawan() {
      const index = this.karyawanList.findIndex(k => k.id === this.editedKaryawan.id);
      if (index !== -1) {
        this.$set(this.karyawanList, index, { ...this.editedKaryawan });
        this.closeEditModal();
      }
    },
    deleteKaryawan(id) {
      this.karyawanList = this.karyawanList.filter(karyawan => karyawan.id !== id);
      alert('Deleted karyawan with ID: ' + id);
    }
  },
  mounted() {
    this.fetchKaryawanData();
  }
};
</script>

<style scoped>
.data-karyawan {
  font-family: 'Arial', sans-serif;
  background-color: #f0f4f7;
  padding: 20px;
  width: 76vw;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.data-karyawan h1 {
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

.card {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-icon-container {
  background-color: #f2f2f2;
  padding: 10px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.search-icon {
  font-size: 18px;
  color: #888;
}

.search-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-left: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  outline: none;
}

.karyawan-table {
  width: 100%;
  border-collapse: collapse;
}

.karyawan-table th,
.karyawan-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.karyawan-table th {
  background-color: #f2f2f2;
  color: #333;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center; /* Center align items horizontally */
}

.action-button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  display: inline-flex; /* Change to inline-flex to make width fit-content work */
  align-items: center;
  justify-content: center; /* Center the text and icon horizontally */
  width: 100px; /* Set a fixed width for both buttons */
}

.edit-button {
  background-color: #2196F3;
  color: white;
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #888;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close-button:hover,
.close-button:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
