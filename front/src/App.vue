<template>
  <div id="app">
    <header class="container">
      <h1>Keyboard Warriors Blog</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/signin">Sign In</router-link>
      </nav>
    </header>

    <main>
      <router-view/>
    </main>

    <footer>
      <p>© 2024 Keyboard Warriors.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
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
</style>
