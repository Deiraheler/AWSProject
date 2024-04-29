<script setup>

import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
</script>

<template>
  <div class="sign-in-containers">
    <LoginComponent />
    <RegisterComponent />
  </div>
</template>

<style>
.sign-in-containers {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;
}

.block-container{
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
  background-color: #4e98ff;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.block-container form > div{
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 90%;
}

.block-container form > div label{
  margin-bottom: 5px;
}

.block-container > h1{
  font-size: 20px;
  background: #333333;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>