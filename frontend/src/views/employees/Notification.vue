<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-12 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Notifikasi</h5>
              <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(notification, index) in notifications" :key="index">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 class="mb-0">{{ notification.title }}</h6>
                      <small class="text-muted">{{ notification.time }}</small>
                    </div>
                    <button class="btn btn-link text-danger" @click="removeNotification(index)">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                  <p class="mb-0">{{ notification.message }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Notification',
    data() {
      return {
        notifications: [
          { title: 'Meeting Reminder', time: '10:00 AM', message: 'Meeting at 10:00 AM with the team.' },
          { title: 'New Message', time: '9:00 AM', message: 'You have a new message from John.' },
          { title: 'Task Due', time: '8:00 AM', message: 'Your task is due today.' },
          // Tambahkan notifikasi lainnya di sini
        ],
      };
    },
    methods: {
      removeNotification(index) {
        this.notifications.splice(index, 1);
      },
    },
  };
  </script>
  
  <style scoped>
  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .list-group-item h6 {
    margin-bottom: 0.5rem;
  }
  
  .list-group-item small {
    font-size: 0.75rem;
  }
  
  .list-group-item p {
    margin-bottom: 0;
  }
  
  .btn-link {
    font-size: 1.25rem;
    color: #dc3545;
    text-decoration: none;
  }
  
  .btn-link:hover {
    color: #c82333;
  }
  </style>
  