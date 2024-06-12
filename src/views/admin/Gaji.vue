<template>
  <div class="gaji">
    <h1>Daftar Gaji Karyawan</h1>
    <div class="card">
    <div class="top-bar">
      <button @click="showModal = true" class="add-button">
        <i class="bi bi-plus-circle"></i> Tambah Gaji
      </button>
      <div class="search-container">
        <div class="search-icon-container">
          <i class="bi bi-search search-icon"></i>
        </div>
        <input type="text" v-model="searchQuery" placeholder="Search..." class="search-input"/>
      </div>
    </div>
    <table class="gaji-table">
      <thead>
        <tr>
          <th>Nama Karyawan</th>
          <th>Periode</th>
          <th>Gaji Pokok</th>
          <th>Tunjangan</th>
          <th>Potongan</th>
          <th>Total Gaji</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in filteredRecords" :key="record.id">
          <td>{{ record.nama }}</td>
          <td>{{ record.periode }}</td>
          <td>{{ formatCurrency(record.gajiPokok) }}</td>
          <td>{{ formatCurrency(record.tunjangan) }}</td>
          <td>{{ formatCurrency(record.potongan) }}</td>
          <td>{{ formatCurrency(record.totalGaji) }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span @click="showModal = false" class="close-button">&times;</span>
        <h2>Tambah Gaji</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <input type="text" v-model="newRecord.nama" placeholder="Nama Karyawan" required />
          </div>
          <div class="form-group">
            <input type="month" v-model="newRecord.periode" placeholder="Periode" required />
          </div>
          <div class="form-group">
            <input type="number" v-model.number="newRecord.gajiPokok" placeholder="Gaji Pokok" required />
          </div>
          <div class="form-group">
            <input type="number" v-model.number="newRecord.tunjangan" placeholder="Tunjangan" required />
          </div>
          <div class="form-group">
            <input type="number" v-model.number="newRecord.potongan" placeholder="Potongan" required />
          </div>
          <div class="form-group">
            <input type="number" v-model="calculatedTotalGaji" placeholder="Total Gaji" readonly />
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
  name: 'Gaji',
  data() {
    return {
      searchQuery: '',
      showModal: false,
      newRecord: {
        nama: '',
        periode: '',
        gajiPokok: '',
        tunjangan: '',
        potongan: ''
      },
      records: [
        { id: 1, nama: 'Dewi Maharani', periode: '2024-05', gajiPokok: 5000000, tunjangan: 100000, potongan: 50000, totalGaji: 5050000 },
        { id: 2, nama: 'Annisa Aisyah', periode: '2024-05', gajiPokok: 5000000, tunjangan: 100000, potongan: 60000, totalGaji: 5040000 },
        // Tambahkan data gaji lainnya sesuai kebutuhan
      ]
    };
  },
  computed: {
    filteredRecords() {
      return this.records.filter(record => 
        record.nama.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        record.periode.includes(this.searchQuery)
      );
    },
    calculatedTotalGaji() {
      return this.newRecord.gajiPokok + this.newRecord.tunjangan - this.newRecord.potongan;
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    },
    addGaji() {
      this.showModal = true;
    },
    submitForm() {
      const newId = this.records.length ? Math.max(...this.records.map(record => record.id)) + 1 : 1;
      this.records.push({ id: newId, ...this.newRecord, totalGaji: this.calculatedTotalGaji });
      this.newRecord = { nama: '', periode: '', gajiPokok: 0, tunjangan: 0, potongan: 0 };
      this.showModal = false;
    }
  }
};
</script>

<style scoped>
.gaji {
  font-family: 'Arial', sans-serif;
  background-color: #f0f4f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.gaji h1 {
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
  margin-bottom: 20px;
}

.add-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.add-button i {
  margin-right: 5px;
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

.gaji-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
}

.gaji-table th,
.gaji-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.gaji-table th {
  background-color: #4CAF50;
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
  background-color: rgba(255, 255, 255, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 40px;
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
  margin-bottom: 10px;
}

.form-group input {
  width: 100%;
  padding: 6px;
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
  margin-top: 20px;
  width: 100%;
  border-radius: 5px;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
