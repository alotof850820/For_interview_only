<template>
  <div class="home-container">
    <setting-card v-for="(item, index) in settingData" :key="index" v-bind="item" :width="cardWidth"
      @click="router.push({ name: item.pathName })"></setting-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import settingCard from "@/components/SettingCard.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const settingData = ref<{
  title: string,
  pathName: string,
  content: string,
}[]>([]);
const cardWidth = ref<number>(251);

const getSettingData = () => {
  // 可創假資料作為API
  settingData.value = [
    {
      title: "SetTime",
      pathName: "SetTime",
      content: "SetTime",
    },
    {
      title: "TodoList",
      pathName: "TodoList",
      content: "TodoList",
    },
    {
      title: "UITest",
      pathName: "UITest",
      content: "UITest",
    },
    {
      title: "PostView",
      pathName: "PostView",
      content: "PostView",
    },
  ];
};

getSettingData();
</script>
<style scoped lang="scss">
.home-container {
  width: 100%;
  min-height: calc(100vh - 34px - 48px);
  overflow-y: auto;
}
</style>
