<template>
  <div id="app">
    <header class="container">
      <h1>Keyboard Warriors Blog</h1>
      <nav>
        <router-link to="/">Blog</router-link>
        <router-link v-if="isUserLoggedIn" to="/post">Post</router-link>
        <router-link v-if="isUserLoggedIn" to="/profile">Profile</router-link>
        <router-link v-if="!isUserLoggedIn" to="/signin">Sign In</router-link>
        <a v-else class="button-logout" @click="logout">Sign Out</a>
      </nav>
    </header>

    <main class="container">
      <router-view/>
    </main>

    <footer>
      <p>© 2024 Keyboard Warriors.</p>
    </footer>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'App',
  setup() {
    const store = useStore();

    const isUserLoggedIn = computed(() => store.state.userLogin);

    const logout = () => {
      store.dispatch('removeUserLogin');
    };

    return {
      isUserLoggedIn,
      logout
    };
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a{
  text-decoration: none;
  color: inherit;
}

header .router-link-active{
  background-color: #4e98ff;
  color: white;
}

nav > a{
  padding: 5px;
  margin-left: 15px;
}

.button-logout{
  background-color: #333333;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

body{
  font-family: Arial, sans-serif;
  background-color: #BDE4F4;
}
header{
  background-color: #F5FEFF;
  color: black;
}
header h1{
  font-size: 16px;
}
.container{
  padding: 10px;
}

header.container{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button{
  padding: 5px 10px;
  background-color: #1663cf;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover{
  background-color: #006bff;
}
</style>
