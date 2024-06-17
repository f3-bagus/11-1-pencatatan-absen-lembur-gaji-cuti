<template>
  <div class="laporan">
    <h1>Laporan dan Analisis Karyawan</h1>
    <div class="card">
      <div class="top-bar">
        <div class="left-controls">
          <button @click="generateReport('pdf')" class="export-button">Export PDF</button>
          <button @click="generateReport('csv')" class="export-button csv">Export CSV</button>
        </div>
        <div class="search-container">
          <div class="search-icon-container">
            <i class="bi bi-search search-icon"></i>
          </div>
          <input type="text" v-model="searchQuery" placeholder="Search..." class="search-input" />
        </div>
      </div>
      <!-- Report sections -->
      <div class="report-section">
        <table class="laporan-table">
          <thead>
            <tr>
              <th colspan="6" class="table-keterangan text-center">Rekapitulasi Kehadiran Karyawan</th>
            </tr>
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
            <tr v-for="record in filteredAttendanceRecords" :key="record.id">
              <td>{{ record.nama }}</td>
              <td>{{ record.tanggal }}</td>
              <td>{{ record.status }}</td>
              <td>{{ record.jamMasuk }}</td>
              <td>{{ record.jamKeluar }}</td>
              <td>{{ record.terlambat }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="report-section">
        <table class="laporan-table">
          <thead>
            <tr>
              <th colspan="4" class="table-keterangan text-center">Rekapitulasi Lembur</th>
            </tr>
            <tr>
              <th>Nama Karyawan</th>
              <th>Tanggal</th>
              <th>Jumlah Jam</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in filteredOvertimeRecords" :key="record.id">
              <td>{{ record.nama }}</td>
              <td>{{ record.tanggal }}</td>
              <td>{{ record.jumlahJam }}</td>
              <td>{{ record.keterangan }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="report-section">
        <table class="laporan-table">
          <thead>
            <tr>
              <th colspan="5" class="table-keterangan text-center">Rekapitulasi Cuti</th>
            </tr>
            <tr>
              <th>Nama Karyawan</th>
              <th>Tanggal Mulai</th>
              <th>Tanggal Selesai</th>
              <th>Jenis Cuti</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in filteredLeaveRecords" :key="record.id">
              <td>{{ record.nama }}</td>
              <td>{{ record.tanggalMulai }}</td>
              <td>{{ record.tanggalSelesai }}</td>
              <td>{{ record.jenisCuti }}</td>
              <td>{{ record.keterangan }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="report-section">
        <table class="laporan-table">
          <thead>
            <tr>
              <th colspan="6" class="table-keterangan text-center">Rekapitulasi Penggajian</th>
            </tr>
            <tr>
              <th>Nama Karyawan</th>
              <th>Periode</th>
              <th>Gaji Pokok</th>
              <th>Tunjangan</th>
              <th>Potongan</th>
              <th>Total Gaji</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in filteredSalaryRecords" :key="record.id">
              <td>{{ record.nama }}</td>
              <td>{{ record.periode }}</td>
              <td>{{ formatCurrency(record.gajiPokok) }}</td>
              <td>{{ formatCurrency(record.tunjangan) }}</td>
              <td>{{ formatCurrency(record.potongan) }}</td>
              <td>{{ formatCurrency(record.totalGaji) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  name: 'Laporan',
  setup() {
    const searchQuery = ref('');
    const attendanceRecords = ref([
      { id: 1, nama: 'Dewi Maharani', tanggal: '2024-06-01', status: 'Hadir', jamMasuk: '08:00', jamKeluar: '17:00', terlambat: 'Tidak' },
      // Add more attendance records
    ]);
    const overtimeRecords = ref([
      { id: 1, nama: 'Dewi Maharani', tanggal: '2024-06-01', jumlahJam: 2, keterangan: 'Project Deadline' },
      // Add more overtime records
    ]);
    const leaveRecords = ref([
      { id: 1, nama: 'Dewi Maharani', tanggalMulai: '2024-05-01', tanggalSelesai: '2024-05-05', jenisCuti: 'Cuti Tahunan', keterangan: 'Liburan' },
      // Add more leave records
    ]);
    const salaryRecords = ref([
      { id: 1, nama: 'Dewi Maharani', periode: '2024-05', gajiPokok: 5000000, tunjangan: 500000, potongan: 0, totalGaji: 5500000 },
      // Add more salary records
    ]);

    const filteredAttendanceRecords = computed(() => {
      return attendanceRecords.value.filter(record =>
        record.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        record.tanggal.includes(searchQuery.value)
      );
    });
    const filteredOvertimeRecords = computed(() => {
      return overtimeRecords.value.filter(record =>
        record.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        record.tanggal.includes(searchQuery.value)
      );
    });
    const filteredLeaveRecords = computed(() => {
      return leaveRecords.value.filter(record =>
        record.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        record.tanggalMulai.includes(searchQuery.value) ||
        record.tanggalSelesai.includes(searchQuery.value)
      );
    });
    const filteredSalaryRecords = computed(() => {
      return salaryRecords.value.filter(record =>
        record.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        record.periode.includes(searchQuery.value)
      );
    });

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    };

    const generateReport = (format) => {
      if (format === 'pdf') {
        const doc = new jsPDF();

        doc.text('Laporan dan Analisis Karyawan', 10, 10);

        const addTableWithHeader = (headerText, columns, data, startY) => {
          doc.autoTable({
            head: [[headerText]],
            body: [[]],
            startY: startY,
            theme: 'plain',
            headStyles: { halign: 'center', fillColor: [255, 255, 255] },
            columnStyles: { 0: { halign: 'center' } },
          });

          doc.autoTable({
            head: [columns],
            body: data,
            startY: doc.lastAutoTable.finalY + 5,
            theme: 'striped',
          });
        };

        const attendanceData = filteredAttendanceRecords.value.map(record => [
          record.nama,
          record.tanggal,
          record.status,
          record.jamMasuk,
          record.jamKeluar,
          record.terlambat
        ]);
        addTableWithHeader('Keterangan Kehadiran', ['Nama Karyawan', 'Tanggal', 'Status', 'Jam Masuk', 'Jam Keluar', 'Terlambat'], attendanceData, doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : 20);

        const overtimeData = filteredOvertimeRecords.value.map(record => [
          record.nama,
          record.tanggal,
          record.jumlahJam,
          record.keterangan
        ]);
        addTableWithHeader('Keterangan Lembur', ['Nama Karyawan', 'Tanggal', 'Jumlah Jam', 'Keterangan'], overtimeData, doc.lastAutoTable.finalY + 15);

        const leaveData = filteredLeaveRecords.value.map(record => [
          record.nama,
          record.tanggalMulai,
          record.tanggalSelesai,
          record.jenisCuti,
          record.keterangan
        ]);
        addTableWithHeader('Keterangan Cuti', ['Nama Karyawan', 'Tanggal Mulai', 'Tanggal Selesai', 'Jenis Cuti', 'Keterangan'], leaveData, doc.lastAutoTable.finalY + 15);

        const salaryData = filteredSalaryRecords.value.map(record => [
          record.nama,
          record.periode,
          formatCurrency(record.gajiPokok),
          formatCurrency(record.tunjangan),
          formatCurrency(record.potongan),
          formatCurrency(record.totalGaji)
        ]);
        addTableWithHeader('Keterangan Penggajian', ['Nama Karyawan', 'Periode', 'Gaji Pokok', 'Tunjangan', 'Potongan', 'Total Gaji'], salaryData, doc.lastAutoTable.finalY + 15);

        doc.save('laporan_karyawan.pdf');
      } else if (format === 'csv') {
        const downloadCSV = (data, filename) => {
          const csvContent = "data:text/csv;charset=utf-8," 
            + data.map(e => Object.values(e).join(",")).join("\n");
          const encodedUri = encodeURI(csvContent);
          const link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

        downloadCSV(filteredAttendanceRecords.value, "attendance_records.csv");
        downloadCSV(filteredOvertimeRecords.value, "overtime_records.csv");
        downloadCSV(filteredLeaveRecords.value, "leave_records.csv");
        downloadCSV(filteredSalaryRecords.value, "salary_records.csv");
      }
    };

    return {
      searchQuery,
      filteredAttendanceRecords,
      filteredOvertimeRecords,
      filteredLeaveRecords,
      filteredSalaryRecords,
      formatCurrency,
      generateReport,
    };
  },
};
</script>

<style>
.laporan {
  padding: 20px;
}

.card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.left-controls {
  display: flex;
  align-items: center;
}

.export-button {
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 20px;
}
.csv {
  background-color: #09750d;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 20px;
}

.export-button:hover {
  background-color: #d04a4a;
}
.csv:hover {
  background-color: #45a049;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  padding: 10px;
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
}

.report-section {
  margin-top: 20px;
}

.report-section h4 {
  margin-bottom: 10px;
}

.laporan-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.laporan-table th,
.laporan-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.laporan-table th {
  background-color: #4CAF50;
  color: #fff;
}

.laporan-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

@media (max-width: 768px) {
  .chart {
    width: 100%;
  }
}
</style>

