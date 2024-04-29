<script setup>
import { ref } from 'vue';
import axios from 'axios';
//import {useStore} from "vuex";
import AWS from 'aws-sdk';

const title = ref('');
const content = ref('');
const fileName = ref(null);
const fileType = ref(null);
const file = ref(null);
const fileS3Url = ref(null);
//const store = useStore();

// async function getPresignedUrl(file) {
//   try {
//     const response = await axios.get(`http://localhost:3000/generate-signed-url?filename=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`);
//     console.log("Getting pre-signed URL: ", response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error getting pre-signed URL:', error);
//     throw error;
//   }
// }

async function uploadToS3() {
  try {
    const credentials = new AWS.Credentials({
      accessKeyId: 'AKIA2UC3AYLKVJJRFZOK', // Replace with your actual access key ID
      secretAccessKey: 'bqjLzDjaitOisr7137Jc2LmgKa+0pQT5lpFj80Ee' // Replace with your actual secret access key
    });

    AWS.config.update({
      region: 'eu-west-1',
      credentials: credentials
    });

    // const s3 = new AWS.S3({
    //   apiVersion: '2006-03-01',
    //   params: { Bucket: 'blog-images-keyboard-warriors' }
    // });

    const files = document.getElementById('file-upload').files;

    let uploadPromises = [];


    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let fileName = file.name;

      let upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: 'blog-images-keyboard-warriors',
          Key: fileName,
          Body: file,
        }
      });

      uploadPromises.push(upload.promise());
    }

    await Promise.all(uploadPromises).then(function(data) {
      console.log('Successfully uploaded files:', data);
      fileS3Url.value = data[0].Location;
      console.log('File URL:', fileS3Url.value);
    }).catch(function(err) {
      console.error('Error uploading files:', err);
    });
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Failed to upload image.');
  }
}

const createPost = async () => {
  if (!localStorage.getItem('token')) {
    alert('User must be logged in to create posts.');
    return;
  }

  if (file.value) {
    try {
      await uploadToS3();
    } catch (error) {
      console.error('Error during image upload:', error);
      alert('Failed to upload image. Please try again.');
      return;
    }
  }

  try {
    const postData = { title: title.value, content: content.value, imageUrl: fileS3Url.value };
    console.log(postData);
    await axios.post('https://3xwoe7u9h2.execute-api.eu-west-1.amazonaws.com/', postData, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    title.value = '';
    content.value = '';
    file.value = null;
  } catch (error) {
    console.error('Failed to create post:', error);
  }
};

const handleFileChange = event => {
  fileName.value = event.target.files[0].name;
  fileType.value = event.target.files[0].type;
  file.value = event.target.files[0]
};
</script>




<template>
  <div class="post-form">
    <h1>Create post</h1>
    <form @submit.prevent="createPost">
      <label for="image-upload">Image (optional):</label>
      <input type="file" id="file-upload" ref="file" style="display: none" accept="image/*" @change="handleFileChange"/>
      <div class="imageUpload" @click="$refs.file.click()"></div>
      <input type="text" v-model="title" placeholder="Title" required>
      <textarea v-model="content" placeholder="Content" required></textarea>
      <button type="submit">Create post</button>
    </form>
  </div>
</template>

<style scoped>
  .imageUpload{
    width: 100%;
    height: 100px;
    border-radius: 5px;
    margin: 10px 0;
    background: #5384e0 url("../assets/file-image.svg") no-repeat center;
    background-size: 40px 40px;
    transition: background-color 0.3s;
    cursor: pointer;
  }

  .imageUpload:hover{
    background-color: #105abe;
    transition: background-color 0.3s;
  }

  .post-form{
    max-width: 450px;
    margin: 20px auto;
  }
  form {
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: #4e98ff;
    border-radius: 5px;
    color: white;
  }
  h1{
    margin-bottom: 10px;
    text-align: center;
  }

  textarea, input{
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 3px;
    border: none;
  }

  textarea{
    resize: vertical;
    min-height: 100px;
  }
</style>