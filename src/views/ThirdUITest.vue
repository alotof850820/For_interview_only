<template>
  <form @submit.prevent="handleSubmit">
    <v-textarea v-model="description" ref="description" />
    <button type="submit">Send</button>
  </form>
  <div>
    <input v-model="password" />
    <div v-if="error">{{ error }}</div>
  </div>
  <div v-if="show">
    {{ greeting }}
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";

const emit = defineEmits(["submitted"]);
const props = defineProps({
  minLength: {
    type: Number,
    default: 0,
  },
  show: {
    type: Boolean,
    default: true,
  },
});

const description = ref<string>("");
const password = ref<string>("");
const greeting = ref<string>("Hello");

const error = computed(
  () =>
    password.value.length < props.minLength &&
    `Password must be at least ${props.minLength} characters.`
);

const handleSubmit = () => {
  emit("submitted", description.value);
};
</script>
<style scoped lang="scss"></style>
