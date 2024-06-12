<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-6 col-md-12 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Formulir Pengajuan Cuti</h5>
            <form @submit.prevent="submitLeave">
              <div class="mb-3">
                <label for="leaveType" class="form-label">Jenis Cuti</label>
                <select id="leaveType" class="form-select" v-model="leaveType" required>
                  <option value="Cuti Tahunan">Cuti Tahunan</option>
                  <option value="Cuti Sakit">Cuti Sakit</option>
                  <option value="Cuti Melahirkan">Cuti Melahirkan</option>
                  <!-- Tambahkan jenis cuti lainnya di sini -->
                </select>
              </div>
              <div class="mb-3">
                <label for="startDate" class="form-label">Tanggal Mulai</label>
                <input type="date" id="startDate" class="form-control" v-model="startDate" required>
              </div>
              <div class="mb-3">
                <label for="endDate" class="form-label">Tanggal Selesai</label>
                <input type="date" id="endDate" class="form-control" v-model="endDate" required>
              </div>
              <div class="mb-3">
                <label for="reason" class="form-label">Alasan</label>
                <textarea id="reason" class="form-control" v-model="reason" rows="3" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Ajukan Cuti</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Sisa Cuti Tahunan</h5>
            <p class="card-text">{{ annualLeaveBalance }} hari</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 col-md-12 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Riwayat Pengajuan Cuti</h5>
            <table class="table">
              <thead>
                <tr>
                  <th>Jenis Cuti</th>
                  <th>Tanggal Mulai</th>
                  <th>Tanggal Selesai</th>
                  <th>Jumlah Hari</th>
                  <th>Alasan</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(application, index) in leaveApplications" :key="index">
                  <td>{{ application.leaveType }}</td>
                  <td>{{ application.startDate }}</td>
                  <td>{{ application.endDate }}</td>
                  <td>{{ application.days }}</td>
                  <td>{{ application.reason }}</td>
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
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Leave',
  data() {
    return {
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: ''
    };
  },
  computed: {
    ...mapState(['annualLeaveBalance']),
    ...mapGetters(['leaveApplications'])
  },
  methods: {
    ...mapActions(['submitLeaveApplication']),
    submitLeave() {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

      if (days > this.annualLeaveBalance) {
        alert('Jumlah hari cuti melebihi sisa cuti tahunan.');
        return;
      }

      const application = {
        leaveType: this.leaveType,
        startDate: this.startDate,
        endDate: this.endDate,
        days,
        reason: this.reason
      };

      this.submitLeaveApplication(application);

      // Clear form
      this.leaveType = '';
      this.startDate = '';
      this.endDate = '';
      this.reason = '';
    }
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

.table {
  width: 100%;
  margin-top: 10px;
}
</style>
