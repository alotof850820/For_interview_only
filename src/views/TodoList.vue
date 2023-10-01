<template>
  <div>
    <list :listData="allTodos" />
  </div>
</template>
<script setup lang="ts">
import List from "@/components/List.vue";
import { ref } from "vue";
import { apiGetAlltodos } from "@/api/apiTodoList";
import type { AllTodoArrayType } from "@/api/apiTodoListType";
import { ElMessage } from "element-plus";

const allTodos = ref<AllTodoArrayType>([]);

const getAllTodo = async () => {
  const res = await apiGetAlltodos();

  if (res.status === 200) {
    allTodos.value = res.data.filter((user) => user.userId === 1);
    allTodos.value.forEach((user) => (user.title = user.title + "test"));
  } else {
    ElMessage({
      type: "error",
      message: "Failed to Get data",
    });
  }
};

getAllTodo();
</script>
<style scoped lang="scss"></style>
