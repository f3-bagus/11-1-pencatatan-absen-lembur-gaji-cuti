<template>
    <div class="register-container">
      <div class="register-box">
        <h2>Create an Account</h2>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" v-model="name" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" required />
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input type="password" v-model="confirmPassword" required />
          </div>
          <button type="submit">Register</button>
        </form>
        <div class="back-to-login">
          <span>Already have an account?</span>
          <router-link to="/login">Back to Login</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    },
    methods: {
      handleRegister() {
        if (this.password !== this.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        // Placeholder for actual registration logic
        alert(`Registered with Name: ${this.name}, Email: ${this.email}`);
        this.$router.push({ name: 'Login' });
      },
    },
  };
  </script>
  
  <style scoped>
  body {
    background-color: #f0f2f5;
    font-family: 'Arial', sans-serif;
  }
  
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('https://example.com/attendance-bg.jpg');
    background-size: cover;
    background-position: center;
  }
  
  .register-box {
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
    margin-top: 1em;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .back-to-login {
    margin-top: 1em;
    text-align: center;
  }
  
  .back-to-login span {
    margin-right: 0.5em;
    color: #555;
  }
  
  .back-to-login a {
    color: #007bff;
    text-decoration: none;
  }
  
  .back-to-login a:hover {
    text-decoration: underline;
  }
  </style>
  