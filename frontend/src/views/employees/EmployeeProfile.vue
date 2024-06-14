<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-12 mb-3">
        <div class="card h-100">
          <div class="card-body text-center">
            <h5 class="card-title">Profil Karyawan</h5>
            <img src="https://via.placeholder.com/150" class="rounded-circle mb-3" alt="Profil Karyawan">
            <p class="card-text">Nama: {{ profile.name }}</p>
            <p class="card-text">Posisi: {{ profile.position }}</p>
            <p class="card-text">Email: {{ profile.email }}</p>
            <p class="card-text">Telepon: {{ profile.phone }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      profile: {
        name: 'Nama Karyawan',
        position: 'Posisi',
        email: 'email@domain.com',
        phone: '08123456789'
      }
    };
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

.img-container {
  display: flex;
  justify-content: center;
}

.img-container img {
  border-radius: 50%;
  width: 150px;
  height: 150px;
}
</style>
