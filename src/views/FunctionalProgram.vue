<template>
  <div>
    <div data-test="form">
      <input data-test="input" v-model="email" />

      <button data-test="setSubmit" @click="setSubmit">Submit</button>
    </div>
    <div>
      <button data-test="setClick" @click="setClick"></button>
    </div>
    <form @submit.prevent="submit">
      <input type="email" v-model="form.email" />

      <textarea v-model="form.description" />

      <select v-model="form.city">
        <option value="new-york">New York</option>
        <option value="moscow">Moscow</option>
      </select>

      <input type="checkbox" v-model="form.subscribe" />

      <input type="radio" value="weekly" v-model="form.interval" />
      <input type="radio" value="monthly" v-model="form.interval" />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const emit = defineEmits(["count", "submit"]);
const count = ref<number>(0);
const email = ref<string>("");

const form = reactive({
  email: "",
  description: "",
  city: "",
  subscribe: false,
  interval: "",
});
const setClick = () => {
  count.value += 1;
  emit("count", {
    count: count.value,
    isEven: count.value % 2 === 0,
  });
};

const setSubmit = () => {
  emit("submit", email.value);
};

const submit = () => {
  emit("submit", form);
};
</script>

<style scoped lang="scss"></style>
