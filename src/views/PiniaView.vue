<template>
  <div>{{ name }}</div>
  <button @click="setName"></button>
</template>
<script setup lang="ts">
import { useSampleStore } from "@/store/app";
import { ref } from "vue";

const store = useSampleStore();
const name = ref(store.name);
const setName = () => {
  store.changeName("test");
  name.value = store.name;
};
</script>
