<template>
  <button :disabled="loading" @click="getPosts">Get posts</button>

  <p v-if="loading" role="alert">Loading your posts…</p>
  <ul v-else>
    <li v-for="post in posts" :key="post.id" data-test="post">
      {{ post.title }}
    </li>
  </ul>
  <div>{{ msg1 }} {{ msg2 }}</div>
  <div>
    <slot />
  </div>
  <div>
    {{ value }}
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { inject } from "vue";
import { provide } from "vue";

import { ref } from "vue";

defineProps({
  msg1: {
    type: String,
    default: "",
  },
});
provide("my-key", "some-data");
const value = inject("my-key");

const posts = ref<any>(null);
const loading = ref<any>(null);
const msg2 = ref<string>("world");

const getPosts = async () => {
  loading.value = true;
  posts.value = await axios.get("/api/posts");

  loading.value = null;
};
</script>
