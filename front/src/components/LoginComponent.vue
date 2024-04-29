<script setup>
import { ref } from 'vue';
import axios from 'axios';
import {useStore} from "vuex";

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const store = useStore();

const handleLogin = async () => {
  try {
    const response = await axios.post('https://ld9tepy989.execute-api.eu-west-1.amazonaws.com/login', {
      email: email.value,
      password: password.value
    });

    errorMessage.value = '';
    store.dispatch('setUserLogin', response.data.token);
    console.log('Login successful:', response.data);

  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response:', error.response.data);
      errorMessage.value = error.response.data.message || 'Error logging in';
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
      errorMessage.value = 'Network error, please try again';
    }
  }
};
</script>

<template>
<div class="block-container">
  <h1>Login</h1>
  <form @submit.prevent="handleLogin">
    <div>
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" required>
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" required>
    </div>
    <button type="submit">Login</button>
    <p style="color: red">{{ errorMessage }}</p>
  </form>
</div>
</template>

<style scoped>
</style>