<template>
  <div class="block-container">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="username" type="text" id="username" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required minlength="6">
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useStore } from 'vuex';

const username = ref('');
const email = ref('');
const password = ref('');
const store = useStore();  // Use the Vuex store

const register = async () => {
  if (password.value.length < 6) {
    alert('Password must be at least 6 characters long!');
    return;
  }

  const url = 'https://ld9tepy989.execute-api.eu-west-1.amazonaws.com/register';
  const body = {
    username: username.value,
    email: email.value,
    password: password.value
  };

  try {
    const response = await axios.post(url, body);

    // If the registration is successful and the Lambda function returns a token,
    // dispatch an action to update the Vuex store and store it in localStorage.
    const token = response.data.token;
    if (token) {
      store.dispatch('setUserLogin', token);
      alert('Registration successful!');
      // Optionally redirect the user or perform further actions
    } else {
      throw new Error('Token not received');
    }
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    alert('Registration failed!');
  }
};
</script>



<style scoped>

</style>
