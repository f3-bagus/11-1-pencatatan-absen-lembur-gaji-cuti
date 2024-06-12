<template>
  <div class="attendance-page">
    <h1>Daftar Kehadiran Karyawan</h1>
    <div class="kehadiran">
      <div class="top-bar">
        <div class="search-container">
          <div class="search-icon-container">
            <i class="bi bi-search search-icon"></i>
          </div>
          <input type="text" v-model="searchQuery" placeholder="Search..." class="search-input"/>
        </div>
      </div>
      <table class="kehadiran-table">
        <thead>
          <tr>
            <th>Nama Karyawan</th>
            <th>Tanggal</th>
            <th>Status</th>
            <th>Jam Masuk</th>
            <th>Jam Keluar</th>
            <th>Terlambat</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="kehadiran in filteredKehadiran" :key="kehadiran.id">
            <td>{{ kehadiran.nama }}</td>
            <td>{{ kehadiran.tanggal }}</td>
            <td :class="getStatusClass(kehadiran.status)">{{ kehadiran.status }}</td>
            <td>{{ kehadiran.jamMasuk }}</td>
            <td>{{ kehadiran.jamKeluar }}</td>
            <td :class="getTerlambatClass(kehadiran.terlambat)">{{ kehadiran.terlambat }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Kehadiran',
  data() {
    return {
      searchQuery: '',
      kehadiranList: [
        { id: 1, nama: 'Dewi Maharani', tanggal: '2024-06-01', status: 'Hadir', jamMasuk: '08:00', jamKeluar: '17:00', terlambat: 'No' },
        { id: 2, nama: 'Annisa Aisyah', tanggal: '2024-06-01', status: 'Hadir', jamMasuk: '08:15', jamKeluar: '17:30', terlambat: 'Yes' },
        { id: 3, nama: 'Azyumi Azra', tanggal: '2024-06-01', status: 'Hadir', jamMasuk: '08:00', jamKeluar: '17:30', terlambat: 'No' },
        { id: 4, nama: 'Febi Gumas Wari', tanggal: '2024-06-01', status: 'Hadir', jamMasuk: '08:20', jamKeluar: '17:30', terlambat: 'Yes' },
        { id: 5, nama: 'Kevin Farrell', tanggal: '2024-06-01', status: 'Hadir', jamMasuk: '08:20', jamKeluar: '17:30', terlambat: 'Yes' },
        { id: 6, nama: 'Moh Holik', tanggal: '2024-06-01', status: 'Hadir', jamMasuk: '08:00', jamKeluar: '17:30', terlambat: 'No' },
        // Add more attendance records as needed
      ]
    };
  },
  computed: {
    filteredKehadiran() {
      return this.kehadiranList.filter(kehadiran => 
        kehadiran.nama.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        kehadiran.tanggal.includes(this.searchQuery.toLowerCase()) ||
        kehadiran.status.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        kehadiran.jamMasuk.includes(this.searchQuery.toLowerCase()) ||
        kehadiran.jamKeluar.includes(this.searchQuery.toLowerCase()) ||
        kehadiran.terlambat.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    getStatusClass(status) {
      return status === 'Hadir' ? 'status-hadir' : 'status-absent';
    },
    getTerlambatClass(terlambat) {
      return terlambat === 'Yes' ? 'terlambat-yes' : 'terlambat-no';
    }
  }
};
</script>

<style scoped>
.attendance-page {
  font-family: 'Arial', sans-serif;
  background-color: #f0f4f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2em; 
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
}

.kehadiran {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
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

.kehadiran-table {
  width: 100%;
  border-collapse: collapse;
}

.kehadiran-table th,
.kehadiran-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

.kehadiran-table th {
  background-color: #4CAF50;
  color: white;
}

.kehadiran-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.status-hadir {
  color: green;
  font-weight: bold;
}

.status-absent {
  color: red;
  font-weight: bold;
}

.terlambat-yes {
  color: red;
  font-weight: bold;
}

.terlambat-no {
  color: green;
  font-weight: bold;
}
</style>
