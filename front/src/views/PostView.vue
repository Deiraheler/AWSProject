<script>
import axios from "axios";
import {onMounted, ref} from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const post = ref(null);
    const errorOut = ref(null);

    const route = useRoute();

    const fetchPost = async () => {
      const postId = route.params.id;
      try {
        const response = await axios.get(`https://3xwoe7u9h2.execute-api.eu-west-1.amazonaws.com/${postId}`);
        post.value = response.data;
      } catch (error) {
        console.error('Error fetching post:', error);
        errorOut.value = error;
      }
    };

    const formatDate = (isoDate) => {
      const date = new Date(isoDate);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }

    onMounted(fetchPost);

    return {
      post,
      errorOut,
      formatDate
    };
  }
};
</script>

<template>
  <div>
    <h1>Post</h1>
    <div v-if="errorOut">
      <p>Error loading post: {{ errorOut.message }}</p>
    </div>
    <div class="block-container" v-else-if="post">
      <h2>{{post.title}}</h2>
      <img :src="post.imageURL" alt="Post Image" v-if="post.imageURL" />
      <p>{{ post.content }}</p>
      <div class="credentials">
        <p>Author: {{ post.authorId }}</p>
        <p>{{ formatDate(post.createdAt) }}</p>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<style scoped>
.block-container{
  width: 100%;
  margin: 0px auto;
}

img{
  width: 80%;
  margin: 10px 0;
}
</style>
