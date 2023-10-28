<template>
  <div>
    <h1>Welcome!</h1>
    <main data-test="first">
      <slot />
    </main>
    <footer>Thanks for visiting.</footer>
  </div>

  <div>
    <header>
      <slot name="header" />
    </header>

    <main>
      <slot name="main" />
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>

  <div class="scoped">
    <slot name="scoped" v-bind="{ msg }" />
  </div>

  <p>Count: {{ count }}</p>
  <button @click="handleClick">Increment</button>
</template>

<script setup lang="ts">
import { ref } from "vue";

const msg = ref<string>("world");
const count = ref<number>(0);
const handleClick = () => {
  count.value++;
};
</script>
<style scoped lang="scss"></style>
