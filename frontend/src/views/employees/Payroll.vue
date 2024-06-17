<template>
  <div class="container mt-5">
    <!-- Baris untuk Slip Gaji Terbaru -->
    <div class="row mb-4">
      <div class="col-12 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Slip Gaji Terbaru</h5>
            <div class="pay-slip">
              <p><strong>Nama :</strong> {{ latestPaySlip.name }}</p>
              <p><strong>Tanggal :</strong> {{ latestPaySlip.date }}</p>
              <p><strong>Gaji :</strong> {{ latestPaySlip.salary }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Payroll',
  data() {
    return {
      latestPaySlip: {
        name: '',
        date: '',
        salary: '',
      },
    };
  },
  created() {
    this.fetchLatestPaySlip();
  },
  methods: {
    fetchLatestPaySlip() {
      axios.get('/api/v1/user/payslips')
        .then(response => {
          // Mengambil data slip gaji terbaru dari response
          const latestPaySlip = response.data[0]; // Misalnya mengambil data pertama dari array
          this.latestPaySlip.name = latestPaySlip.name;
          this.latestPaySlip.date = latestPaySlip.date;
          this.latestPaySlip.salary = latestPaySlip.salary;
        })
        .catch(error => {
          console.error('Error fetching latest pay slip:', error);
        });
    },
  },
};
</script>

<style scoped>
.card-title {
  font-size: 1.25rem;
  font-weight: 500;
}

.card-text, .pay-slip p {
  font-size: 1rem;
}

.pay-slip {
  margin-top: 20px;
}

.table-responsive {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .pay-slip p {
    font-size: 0.9rem;
  }
  .table-responsive {
    font-size: 0.9rem;
  }
}
</style>
