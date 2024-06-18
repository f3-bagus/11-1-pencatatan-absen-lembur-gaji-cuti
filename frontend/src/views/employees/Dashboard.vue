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
            <!-- Menggunakan router-link untuk navigasi -->
            <router-link to="/notification" class="btn btn-primary">Lihat Notifikasi</router-link>
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
                  <th scope="col">Check In</th>
                  <th scope="col">Status Check In</th>
                  <th scope="col">Check Out</th>
                  <th scope="col">Status Check Out</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(entry, index) in formattedAttendanceList" :key="index">
                  <td>{{entry.presenceDate}}</td>
                  <td>{{ entry.checkIn }}</td>
                  <td>{{ entry.Status }}</td>
                  <td>{{ entry.checkOut || '-' }}</td>
                  <td>{{ entry.Status || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../services/axios';
import { mapState, mapGetters, mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: 'Attendance',
  data() {
    return {
      attendanceList: []
    };
  },
  computed: {
    ...mapState(['currentTime', 'attendance']),
    ...mapGetters(['formattedTime', 'formattedDate']),
    buttonText() {
      return this.attendance.length % 2 === 0 ? 'Masuk' : 'Keluar';
    },
    formattedAttendanceList() {
      return this.attendanceList.map(entry => {
        return {
          ...entry,
          presenceDate: moment(entry.presenceDate).format('DD/MM/YYYY'),
          checkIn: moment(entry.checkIn).format('HH:mm:ss')
        };
      });
    }
  },
  methods: {
    ...mapActions(['updateTime', 'addAttendance']),
    toggleAttendance() {
      const now = new Date();
      const time = this.formatTime(now);
      const date = this.formatDate(now);
      const status = this.getAttendanceStatus(now);

      const newAttendance = {
        date,
        checkInTime: time,
        checkInStatus: status,
        checkOutTime: '',
        checkOutStatus: ''
      };

      axios.post('api/v1/user/presence', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        this.addAttendance(response.data);
        this.loadAttendanceList(); // Refresh the attendance list
      })
      .catch(error => {
        console.error('Error during check-in:', error);
      });

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
    },
    loadAttendanceList() {
      axios.get('api/v1/user/presences', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        this.attendanceList = response.data.data;
        console.log(this.attendanceList);
      })
      .catch(error => {
        console.error('Error loading attendance list:', error);
      });
    },
    formatDate(date) {
      return new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    },
    formatTime(date) {
      return new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(date);
    },
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    }
  },
  
  created() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
    this.loadAttendanceList(); // Load attendance list on component creation
  }
};
</script>

<style scoped>
@import "./DashboardStyles.css";
</style>
