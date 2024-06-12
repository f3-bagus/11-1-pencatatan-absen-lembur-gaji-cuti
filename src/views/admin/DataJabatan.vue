<template>
  <div class="data-jabatan">
    <h1>Data Jabatan</h1>
    <div class="card">
    <div class="top-bar">
      <button @click="showModal = true" class="add-button">
        <i class="bi bi-plus-circle"></i> Tambah Data Jabatan
      </button>
      <div class="search-container">
        <div class="search-icon-container">
          <i class="bi bi-search search-icon"></i>
        </div>
        <input type="text" v-model="searchQuery" placeholder="Search..." class="search-input" />
      </div>
    </div>

    <table class="jabatan-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama Jabatan</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="jabatan in filteredJabatan" :key="jabatan.id">
          <td>{{ jabatan.id }}</td>
          <td>{{ jabatan.nama }}</td>
          <td class="actions">
            <i @click="viewDetail(jabatan.id)" class="bi bi-info-circle text-primary action-icon"></i>
            <i @click="deleteJabatan(jabatan.id)" class="bi bi-trash text-danger action-icon"></i>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span @click="showModal = false" class="close-button">&times;</span>
        <h2>Tambah Jabatan</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="namaJabatan">Nama Jabatan:</label>
            <input type="text" id="namaJabatan" v-model="newJabatanNama" required />
          </div>
          <button type="submit" class="submit-button">Tambah</button>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'DataJabatan',
  data() {
    return {
      searchQuery: '',
      showModal: false,
      newJabatanNama: '',
      jabatanList: [
        { id: 1, nama: 'CEO (Chief Executive Officer)' },
        { id: 2, nama: 'COO (Chief Operational Officer)' },
        { id: 3, nama: 'CTO (Chief Technical Officer)' },
        { id: 4, nama: 'CMO (Chief Marketing Officer)' },
        { id: 5, nama: 'Sekretaris' },
        { id: 6, nama: 'Bendahara' },
        { id: 7, nama: 'Pemasaran' },
        // Add more positions as needed
      ]
    };
  },
  computed: {
    filteredJabatan() {
      return this.jabatanList.filter(jabatan =>
        jabatan.nama.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    addJabatan() {
      this.showModal = true;
    },
    submitForm() {
      const newId = this.jabatanList.length ? Math.max(this.jabatanList.map(j => j.id)) + 1 : 1;
      this.jabatanList.push({ id: newId, nama: this.newJabatanNama });
      this.newJabatanNama = '';
      this.showModal = false;
    },
    viewDetail(id) {
      alert('View details for ID: ' + id);
    },
    deleteJabatan(id) {
      this.jabatanList = this.jabatanList.filter(jabatan => jabatan.id !== id);
      alert('Deleted position with ID: ' + id);
    }
  }
};
</script>

<style scoped>
.data-jabatan {
  font-family: 'Arial', sans-serif;
  background-color: #f0f4f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.data-jabatan h1 {
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

.add-button {
  background-color: #4CAF50;
  color: white;
  padding: 5px 15px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #45a049;
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

.jabatan-table {
  width: 100%;
  border-collapse: collapse;
}

.jabatan-table th,
.jabatan-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.jabatan-table th {
  background-color: #f2f2f2;
  color: #333;
}

.actions {
  display: flex;
  gap: 10px;
}

.action-icon {
  cursor: pointer;
  font-size: 18px;
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

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
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
