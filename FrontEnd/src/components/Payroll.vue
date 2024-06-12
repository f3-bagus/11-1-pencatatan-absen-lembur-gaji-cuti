<template>
  <div class="container mt-5">
    <!-- Baris untuk Slip Gaji Terbaru -->
    <div class="row mb-4">
      <div class="col-12 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Slip Gaji Terbaru</h5>
            <div class="pay-slip">
              <p><strong>Nama:</strong> {{ latestPaySlip.name }}</p>
              <p><strong>Tanggal:</strong> {{ latestPaySlip.date }}</p>
              <p><strong>Jumlah:</strong> {{ latestPaySlip.amount }}</p>
              <button class="btn btn-primary" @click="downloadPaySlip">Unduh Slip Gaji</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Baris untuk Ringkasan Gaji -->
    <div class="row mb-4">
      <div class="col-12 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Ringkasan Gaji</h5>
            <table class="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">Bulan</th>
                  <th scope="col">Gaji Pokok</th>
                  <th scope="col">Tunjangan</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(summary, index) in salarySummary" :key="index">
                  <td>{{ summary.month }}</td>
                  <td>{{ summary.basicSalary }}</td>
                  <td>{{ summary.allowance }}</td>
                  <td>{{ summary.total }}</td>
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
export default {
  name: 'Payroll',
  data() {
    return {
      latestPaySlip: {
        name: 'John Doe',
        date: 'June 2024',
        amount: 'Rp 10,000,000',
      },
      salarySummary: [
        { month: 'Januari', basicSalary: 'Rp 8,000,000', allowance: 'Rp 2,000,000', total: 'Rp 10,000,000' },
        { month: 'Februari', basicSalary: 'Rp 8,000,000', allowance: 'Rp 1,500,000', total: 'Rp 9,500,000' },
        // Tambahkan data lainnya di sini
      ],
    };
  },
  methods: {
    downloadPaySlip() {
      // Logika untuk mengunduh slip gaji dapat ditambahkan di sini
      alert('Mengunduh Slip Gaji...');
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
