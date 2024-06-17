<template>
  <div class="leave-management">
    <!-- Form Pengajuan Cuti -->
    <div class="leave-application">
      <h2>Ajukan Cuti</h2>
      <form @submit.prevent="submitLeave">
        <div class="form-group">
          <label for="leave_type">Jenis Cuti</label>
          <select v-model="leaveType" required>
            <option value="Annual Leave">Cuti Tahunan</option>
            <option value="Sick Leave">Cuti Sakit</option>
            <option value="Personal Leave">Cuti Pribadi</option>
          </select>
        </div>
        <div class="form-group">
          <div class="date-inputs">
            <div>
              <label for="start_date">Tanggal Mulai</label>
              <input type="date" v-model="startDate" required />
            </div>
            <div>
              <label for="end_date">Tanggal Berakhir</label>
              <input type="date" v-model="endDate" required />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="reason">Alasan</label>
          <textarea v-model="reason" required></textarea>
        </div>
        <button type="submit">Ajukan</button>
      </form>
    </div>

    <!-- Tabel Riwayat Cuti -->
    <div class="leave-history">
      <h2>Riwayat Cuti</h2>
      <table>
        <thead>
          <tr>
            <th>Tanggal Mengajukan</th>
            <th>Jenis Cuti</th>
            <th>Durasi Cuti</th>
            <th>Alasan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="history in leaveHistory" :key="history.leave_id">
            <td>{{ history.submission_date }}</td>
            <td>{{ history.leave_type }}</td>
            <td>{{ formatDate(history.start_date) }} s/d {{ formatDate(history.end_date) }}</td>
            <td>{{ history.reason }}</td>
            <td>{{ history.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
      leaveHistory: [],
      nextLeaveId: 1,
    };
  },
  created() {
    this.fetchLeaveHistory();
  },
  methods: {
    submitLeave() {
      const newLeave = {
        leave_id: this.nextLeaveId++,
        submission_date: new Date().toISOString().slice(0, 10),
        leave_type: this.leaveType,
        start_date: this.startDate,
        end_date: this.endDate,
        reason: this.reason,
        status: 'Menunggu persetujuan',
      };
      // Simulasi pengajuan cuti dengan menambahkan data langsung ke leaveHistory
      this.leaveHistory.push(newLeave);
      this.resetForm();
    },
    resetForm() {
      this.leaveType = '';
      this.startDate = '';
      this.endDate = '';
      this.reason = '';
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    },
    fetchLeaveHistory() {
      axios.get('/api/v1/user/leaves')
        .then(response => {
          this.leaveHistory = response.data; // Mengisi leaveHistory dengan data dari API
        })
        .catch(error => {
          console.error('Error fetching leave history:', error);
        });
    },
  },
};
</script>

<style scoped>
@import "./LeaveStyles.css"
</style>
