import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Leave from '../components/Leave.vue';
import Payroll from '../components/Payroll.vue';
import AdminDashboard from '../views/admin/AdminDashboard.vue';
import Karyawan from '../views/admin/Karyawan.vue';
import DataJabatan from '../views/admin/DataJabatan.vue';
import DataKaryawan from '../views/admin/DataKaryawan.vue';
import Kehadiran from '../views/admin/Kehadiran.vue';
import LemburCuti from '../views/admin/LemburCuti.vue';
import Gaji from '../views/admin/Gaji.vue';
import Laporan from '../views/admin/Laporan.vue';
import Pengaturan from '../views/admin/Pengaturan.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/leave',
    name: 'Leave',
    component: Leave,
  },
  {
    path: '/payroll',
    name: 'Payroll',
    component: Payroll,
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
  },
  {
    path: '/admin/karyawan',
    name: 'Karyawan',
    component: Karyawan,
  },
  {
    path: '/admin/karyawan/datajabatan',
    name: 'DataJabatan',
    component: DataJabatan,
  },
  {
    path: '/admin/karyawan/datakaryawan',
    name: 'DataKaryawan',
    component: DataKaryawan,
  },
  {
    path: '/admin/kehadiran',
    name: 'Kehadiran',
    component: Kehadiran,
  },
  {
    path: '/admin/lemburcuti',
    name: 'Lembur dan Cuti',
    component: LemburCuti,
  },
  {
    path: '/admin/gaji',
    name: 'Gaji',
    component: Gaji,
  },
  {
    path: '/admin/laporan',
    name: 'Laporan',
    component: Laporan,
  },
  {
    path: '/admin/pengaturan',
    name: 'Pengaturan',
    component: Pengaturan,
  },
  // Additional admin routes can go here
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;