<template>
  <div class="lemburcuti-page">
      <h1>Daftar Lembur dan Cuti</h1>
    <div class="card">
      <div class="top-bar">
        <div class="search-container">
          <div class="search-icon-container">
            <i class="bi bi-search search-icon"></i>
          </div>
          <input type="text" v-model="searchQuery" placeholder="Search..." class="search-input"/>
        </div>
      </div>
      <table class="lemburcuti-table">
      <thead>
        <tr>
          <th>Nama Karyawan</th>
          <th>Tanggal</th>
          <th>Jenis</th>
          <th>Keterangan</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in filteredRecords" :key="record.id">
          <td>{{ record.nama }}</td>
          <td>{{ record.tanggal }}</td>
          <td :class="getJenisClass(record.jenis)">{{ record.jenis }}</td>
          <td>{{ record.keterangan }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
export default {
  name: 'LemburCuti',
  data() {
    return {
      searchQuery: '',
      records: [
        { id: 1, nama: 'Dewi Maharani', tanggal: '2024-06-01', jenis: 'Lembur', keterangan: 'Lembur tambahan di akhir pekan' },
        { id: 2, nama: 'Annisa Aisyah', tanggal: '2024-06-02', jenis: 'Cuti', keterangan: 'Cuti untuk acara keluarga' },
        { id: 3, nama: 'Azyumi Azra', tanggal: '2024-06-02', jenis: 'Lembur', keterangan: 'Lembur tambahan di akhir pekan' },
        // Tambahkan data lembur dan cuti lainnya sesuai kebutuhan
      ]
    };
  },
  computed: {
    filteredRecords() {
      return this.records.filter(record => 
        record.nama.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        record.tanggal.includes(this.searchQuery.toLowerCase()) ||
        record.jenis.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        record.keterangan.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    getJenisClass(jenis) {
      return jenis === 'Lembur' ? 'jenis-lembur' : 'jenis-cuti';
    }
  }
};
</script>

<style scoped>
.lemburcuti-page {
  font-family: 'Arial', sans-serif;
  background-color: #f0f4f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2em; 
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
}

.top-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
}

.search-container {
  display: flex;
  align-items: center;
  position: relative;
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
  transition: border 0.3s ease;
}

.search-input:focus {
  border-color: #4CAF50;
}

.lemburcuti-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
}

.lemburcuti-table th,
.lemburcuti-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

.lemburcuti-table th {
  background-color: #4CAF50;
  color: white;
}

.lemburcuti-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.jenis-lembur {
  color: blue;
  font-weight: bold;
}

.jenis-cuti {
  color: orange;
  font-weight: bold;
}
</style>
