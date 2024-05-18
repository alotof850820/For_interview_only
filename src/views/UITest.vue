<template>
  <div class="container">
    <div class="title">文章</div>
    <UITest :width="200"></UITest>
  </div>
</template>

<script lang="ts" setup>
import UITest from "@/components/UITest.vue";
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .title {
    background-color: black;
    text-align: center;
    color: white;
  }
}
</style>
