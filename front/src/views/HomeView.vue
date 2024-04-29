<script>
import { reactive, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const state = reactive({
      posts: []
    });

    const formatDate = (isoDate) => {
      const date = new Date(isoDate);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }

    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://3xwoe7u9h2.execute-api.eu-west-1.amazonaws.com/all');
        state.posts = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    onMounted(fetchPosts);

    return {
      state,
      formatDate
    };
  }
};
</script>

<template>
  <div>
    <h1>All Posts</h1>
    <div class="parent">
      <a :href="'/post/' + post.postId" v-for="post in state.posts" :key="post.postId">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <img :src="post.imageURL" alt="Post Image" v-if="post.imageURL" />
        <p>Author: {{ post.authorId }}</p>
        <p>Date: {{ formatDate(post.createdAt) }}</p>
      </a>
    </div>
  </div>
</template>

<style scoped>
.parent > a{
  margin: 20px;
  padding: 20px;
  background-color: #4e98ff;
  color: white;
}
img{
  width: 100%;
}
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}


</style>