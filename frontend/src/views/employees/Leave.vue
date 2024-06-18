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
      leaveHistory: [
        // Data dummy untuk contoh
        {
          leave_id: 1,
          submission_date: '2024-06-01',
          leave_type: 'Annual Leave',
          start_date: '2024-06-01',
          end_date: '2024-06-05',
          reason: 'Liburan tahunan',
          status: 'Disetujui',
        },
        {
          leave_id: 2,
          submission_date: '2024-06-10',
          leave_type: 'Sick Leave',
          start_date: '2024-06-10',
          end_date: '2024-06-12',
          reason: 'Sakit demam',
          status: 'Menunggu persetujuan',
        },
      ],
      nextLeaveId: 3,
    };
  },
  methods: {
    async submitLeave() {
      const newLeave = {
        leave_type: this.leaveType,
        start_date: this.startDate,
        end_date: this.endDate,
        reason: this.reason,
        status: 'Menunggu persetujuan',
      };

      try {
        const response = await axios.post('/api/v1/user/leaves', newLeave, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Assuming the API responds with the new leave object including an ID
        newLeave.leave_id = response.data.leave_id;
        newLeave.submission_date = response.data.submission_date;

        this.leaveHistory.push(newLeave);
        this.resetForm();
      } catch (error) {
        console.error('Error submitting leave:', error);
        // Handle error accordingly, e.g., show a message to the user
      }
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
  },
};
</script>


<style scoped>
.leave-management {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2em;
}

.leave-application, .leave-history {
  margin-bottom: 2em;
}

.leave-application h2, .leave-history h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 1.5em;
}

label {
  display: block;
  margin-bottom: 0.5em;
}

input, select, textarea {
  width: 100%;
  padding: 0.75em;
  margin-top: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  display: block;
  width: 100%;
  padding: 0.75em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1em;
}

button:hover {
  background-color: #0056b3;
}

.leave-history table {
  width: 100%;
  border-collapse: collapse;
}

.leave-history th, .leave-history td {
  padding: 0.75em;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

.leave-history th {
  background-color: #f2f2f2;
}

.date-inputs {
  display: flex;
  justify-content: space-between;
}

.date-inputs > div {
  width: calc(50% - 0.5em); /* Jarak 0.5em antara input */
}
</style>
