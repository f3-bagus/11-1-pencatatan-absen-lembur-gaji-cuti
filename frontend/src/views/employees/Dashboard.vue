<template>
  <div class="container mt-5">
    <!-- Baris untuk card Profil Karyawan dan Waktu -->
    <div class="row mb-4">
      <div class="col-lg-6 col-md-12 mb-3">
        <div class="card h-100">
          <div class="card-body text-center">
            <h5 class="card-title">Profil Karyawan</h5>
            <img src="https://via.placeholder.com/150" class="rounded-circle mb-3" alt="Profil Karyawan">
            <p class="card-text">Nama Karyawan</p>
            <p class="card-text">Posisi</p>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 mb-3 d-flex flex-column">
        <div class="card flex-fill">
          <div class="card-body text-center">
            <h5 class="card-title">Waktu</h5>
            <p class="card-text">{{ formattedDate }}</p>
            <p class="card-text">{{ formattedTime }}</p>
            <button class="btn btn-primary" @click="toggleAttendance">{{ buttonText }}</button>
          </div>
        </div>
        <div class="card flex-fill mt-3 mt-lg-3 mt-md-0">
          <div class="card-body text-center">
            <h5 class="card-title">Pengingat</h5>
            <i class="bi bi-clock" style="font-size: 2rem;"></i>
            <p class="card-text">Meeting pada jam 10:00 AM.</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Baris untuk card Riwayat Kehadiran Terbaru -->
    <div class="row mb-4">
      <div class="col-12 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Riwayat Kehadiran Terbaru</h5>
            <table class="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">Hari/Tanggal</th>
                  <th scope="col">Waktu Kehadiran</th>
                  <th scope="col">Status Kehadiran</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(entry, index) in attendanceList" :key="index">
                  <td>{{ entry.date }}</td>
                  <td>{{ entry.time }}</td>
                  <td>{{ entry.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- Baris untuk tabel Total Lembur Bulanan -->
    <div class="row mb-4">
      <div class="col-12 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Total Lembur Bulanan</h5>
            <table class="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">Bulan</th>
                  <th scope="col">Total Jam Lembur</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Januari</td>
                  <td>40</td>
                </tr>
                <tr>
                  <td>Februari</td>
                  <td>35</td>
                </tr>
                <!-- Tambahkan data lainnya di sini -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Attendance',
  computed: {
    ...mapState(['currentTime', 'attendance']),
    ...mapGetters(['formattedTime', 'formattedDate', 'attendanceList']),
    buttonText() {
      return this.attendance.length % 2 === 0 ? 'Masuk' : 'Keluar';
    }
  },
  methods: {
    ...mapActions(['updateTime', 'addAttendance']),
    toggleAttendance() {
      const action = this.attendance.length % 2 === 0 ? 'Masuk' : 'Keluar';
      const now = new Date();
      const time = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const date = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const status = this.getAttendanceStatus(now);

      this.addAttendance({ date, time, status });
      this.updateTime();
    },
    getAttendanceStatus(date) {
      const hours = date.getHours();
      if (hours < 8) {
        return 'Tepat Waktu';
      } else if (hours >= 8 && hours < 17) {
        return 'Terlambat';
      } else {
        return 'Lembur';
      }
    }
  },
  created() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }
};
</script>

<style scoped>
.card-title {
  font-size: 1.25rem;
  font-weight: 500;
}

.card-text {
  font-size: 1rem;
}

.card.h-100 {
  height: 100%;
}

@media (max-width: 768px) {
  .mt-lg-3 {
    margin-top: 1rem !important;
  }
  .mt-md-0 {
    margin-top: 0 !important;
  }
}
</style>
