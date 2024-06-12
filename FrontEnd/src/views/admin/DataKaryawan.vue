<template>
  <div class="data-karyawan">
    <h1>Data Karyawan</h1>
    <div class="card">
    <div class="top-bar">
      <button @click="showModal = true" class="add-button">
        <i class="bi bi-plus-circle"></i> Tambah Data Karyawan
      </button>
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
          <th>NIK</th>
          <th>Jabatan</th>
          <th>Departemen</th>
          <th>Email</th>
          <th>Nomor Telepon</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="karyawan in filteredKaryawan" :key="karyawan.id">
          <td>{{ karyawan.id }}</td>
          <td>{{ karyawan.nama }}</td>
          <td>{{ karyawan.nik }}</td>
          <td>{{ karyawan.jabatan }}</td>
          <td>{{ karyawan.departemen }}</td>
          <td>{{ karyawan.email }}</td>
          <td>{{ karyawan.nomorTelepon }}</td>
          <td class="actions">
            <i @click="viewDetail(karyawan.id)" class="bi bi-info-circle text-primary action-icon"></i>
            <i @click="deleteKaryawan(karyawan.id)" class="bi bi-trash text-danger action-icon"></i>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span @click="showModal = false" class="close-button">&times;</span>
        <h2>Tambah Karyawan</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <input type="text" id="namaKaryawan" v-model="newKaryawan.nama" placeholder="Nama Karyawan" required />
          </div>
          <div class="form-group">
            <input type="text" id="nikKaryawan" v-model="newKaryawan.nik" placeholder="NIK" required />
          </div>
          <div class="form-group">
            <input type="text" id="jabatanKaryawan" v-model="newKaryawan.jabatan" placeholder="Jabatan" required />
          </div>
          <div class="form-group">
            <input type="text" id="departemenKaryawan" v-model="newKaryawan.departemen" placeholder="Departemen" required />
          </div>
          <div class="form-group">
            <input type="email" id="emailKaryawan" v-model="newKaryawan.email" placeholder="Email" required />
          </div>
          <div class="form-group">
            <input type="text" id="nomorTeleponKaryawan" v-model="newKaryawan.nomorTelepon" placeholder="Nomor Telepon" required />
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
  name: 'DataKaryawan',
  data() {
    return {
      searchQuery: '',
      showModal: false,
      newKaryawan: {
        nama: '',
        nik: '',
        jabatan: '',
        departemen: '',
        email: '',
        nomorTelepon: ''
      },
      karyawanList: [
        { id: 1, nama: 'Dewi Maharani', nik: '3374098101010007', jabatan: 'Frontend Developer', departemen: 'Developers', email: 'dewiimr283@gmail.com', nomorTelepon: '081234567890' },
        { id: 2, nama: 'Annisa Aisyah', nik: '3374012340090003', jabatan: 'Frontend Developer', departemen: 'Developers', email: 'annisaaisyah@gmail.com', nomorTelepon: '082345678901' },
        { id: 3, nama: 'Azyumi Azra', nik: '3374076540890008', jabatan: 'Frontend Developer', departemen: 'Developers', email: 'azyumiazraa@gmail.com', nomorTelepon: '082345678902' },
        // Tambahkan data karyawan lainnya sesuai kebutuhan
      ]
    };
  },
  computed: {
    filteredKaryawan() {
      return this.karyawanList.filter(karyawan =>
        karyawan.nama.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        karyawan.nik.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        karyawan.jabatan.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        karyawan.departemen.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        karyawan.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        karyawan.nomorTelepon.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    addKaryawan() {
      this.showModal = true;
    },
    submitForm() {
      const newId = this.karyawanList.length ? Math.max(...this.karyawanList.map(k => k.id)) + 1 : 1;
      this.karyawanList.push({ id: newId, ...this.newKaryawan });
      this.newKaryawan = { nama: '', nik: '', jabatan: '', departemen: '', email: '', nomorTelepon: '' };
      this.showModal = false;
    },
    viewDetail(id) {
      alert('View details for ID: ' + id);
    },
    deleteKaryawan(id) {
      this.karyawanList = this.karyawanList.filter(karyawan => karyawan.id !== id);
      alert('Deleted karyawan with ID: ' + id);
    }
  }
};
</script>

<style scoped>
.data-karyawan {
  font-family: 'Arial', sans-serif;
  background-color: #f0f4f7;
  padding: 20px;
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
