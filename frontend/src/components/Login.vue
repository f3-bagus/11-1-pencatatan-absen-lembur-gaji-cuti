<template>
    <div class="login-container">
      <div class="login-box">
        <h2>Employee Attendance Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <div class="register-link">
          <span>Don't have an account?</span>
          <router-link to="/register">Register</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:5565/api/v1/user/login', {
          email: this.email,
          password: this.password,
        }, 
        {
          headers: {
            'Content-Type': 'application/json'
          }});
        console.log(response);
        if (response.status===200) {
          // Simpan token atau lakukan sesuatu dengan data respons
          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('role', response.data.data.privilege);
          // Redirect ke dashboard setelah login berhasil
          if (response.data.data.privilege === "ROOT" || response.data.data.privilege === "ADMIN") {
            this.$router.push({ name: 'AdminDashboard' });
          } else  {
            this.$router.push({ name: 'Dashboard' });
          }
        } else {
          alert('Invalid credentials');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again.');
      }
    },
  },

  };
  </script>

  
  <style scoped>
  body {
    background-color: #f0f2f5;
    font-family: 'Arial', sans-serif;
  }
  
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('https://example.com/attendance-bg.jpg');
    background-size: cover;
    background-position: center;
  }
  
  .login-box {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 2em;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 400px;
    width: 100%;
  }
  
  h2 {
    margin-bottom: 1em;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 1.5em;
    text-align: left;
  }
  
  label {
    margin-bottom: 0.5em;
    font-weight: bold;
    color: #555;
  }
  
  input {
    padding: 0.7em;
    font-size: 1em;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 0.7em;
    font-size: 1em;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .register-link {
    margin-top: 1em;
    text-align: right;
  }
  
  .register-link span {
    margin-right: 0.5em;
    color: #555;
  }
  
  .register-link a {
    color: #007bff;
    text-decoration: none;
  }
  
  .register-link a:hover {
    text-decoration: underline;
  }
  </style>
  
