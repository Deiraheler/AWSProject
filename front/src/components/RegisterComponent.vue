<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Username" required>
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async register() {
      const url = 'https://your-api-gateway-url/register'; // Replace with your actual API Gateway URL
      const body = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      try {
        const response = await axios.post(url, body);
        console.log(response.data); // Success response
        alert('Registration successful!');
      } catch (error) {
        console.error(error.response.data);
        alert('Registration failed!');
      }
    }
  }
}
</script>
