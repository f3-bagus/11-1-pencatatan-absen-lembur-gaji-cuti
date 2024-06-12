<template>
  <div class="dashboard-admin">
    <h1>Dashboard</h1>
    <p>Selamat datang di panel admin. Gunakan sidebar untuk menavigasi fitur admin.</p>
    
    <div class="kartu-container">
      <div class="kartu jumlah-admin">
        <h2>Admin</h2>
        <p>2</p>
      </div>
      <div class="kartu jumlah-karyawan">
        <h2>Karyawan</h2>
        <p>100</p>
      </div>
      <div class="kartu data-kehadiran">
        <h2>Data Kehadiran</h2>
        <p>95%</p>
      </div>
      <div class="kartu data-lembur">
        <h2>Data Lembur</h2>
        <p>25 Jam</p>
      </div>
      <div class="kartu data-cuti">
        <h2>Data Cuti</h2>
        <p>10 Orang</p>
      </div>
      <div class="kartu data-gaji">
        <h2>Data Penggajian</h2>
        <p>Rp. 500,000,000</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardAdmin',
};
</script>

<style scoped>
.dashboard-admin {
  font-family: 'Arial', sans-serif;
  background-color: #f0f4f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard-admin h1 {
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

.dashboard-admin p {
  font-size: 1.2em;
  text-align: center;
}

.kartu-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.kartu {
  flex: 1 1 calc(33.333% - 20px);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  text-align: center;
  color: #fff;
}

.kartu h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.kartu p {
  font-size: 1.2em;
}

.jumlah-admin {
  background-color: #007bff;
}

.jumlah-karyawan {
  background-color: #28a745;
}

.data-kehadiran {
  background-color: #ffc107;
}

.data-lembur {
  background-color: #17a2b8;
}

.data-cuti {
  background-color: #fd7e14;
}

.data-gaji {
  background-color: #6f42c1;
}
</style>
