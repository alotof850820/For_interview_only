<script setup lang="ts">
import { computed, ref } from "vue";

interface Props {
  width: number;
  title: string;
  content: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: 151,
  title: "標題",
  content: "描述",
});

const defaultWidth = ref<number>(251);
const ratio = computed<number>(() => props.width / defaultWidth.value);
</script>
<template>
  <div class="setting-card">
    <div class="inner-box">
      <div class="iconPath-box">圖片</div>
      <span class="title" v-text="title" :title="title"></span>
      <span class="content" v-text="content" :title="content"></span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.setting-card {
  width: calc(251px * v-bind(ratio));
  height: calc(178px * v-bind(ratio));
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: #fff;
  padding: calc(16px * v-bind(ratio));
  margin: 8px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0px 9px 28px 8px rgba(92, 100, 102, 0.05),
    0px 6px 16px 0px rgba(92, 100, 102, 0.08),
    0px 3px 6px -4px rgba(92, 100, 102, 0.12);
  &:hover {
    box-shadow: 0px 8px 48px 16px rgba(110, 95, 175, 0.08),
      0px 4px 28px 0px rgba(110, 95, 175, 0.12),
      0px 0px 16px -8px rgba(110, 95, 175, 0.2);
  }
  .inner-box {
    width: 100%;
    padding: calc(16px * v-bind(ratio));
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: #fff;
    // box-shadow: 0px 9px 28px 8px rgba(182, 174, 214, 0.05),
    //   0px 6px 16px 0px rgba(182, 174, 214, 0.08),
    //   0px 3px 6px -4px rgba(182, 174, 214, 0.12);

    .iconPath-box {
      width: calc(48px * v-bind(ratio));
      height: calc(48px * v-bind(ratio));
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .title {
      display: inline-block;
      margin: calc(20px * v-bind(ratio)) 0 calc(8px * v-bind(ratio)) 0;
      font: normal 500 calc(18px * v-bind(ratio)) / calc(24px * v-bind(ratio))
        Noto Sans TC;
      color: up(title);
      width: 70%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .content {
      display: inline-block;
      font: normal 400 calc(14px * v-bind(ratio)) / calc(18px * v-bind(ratio))
        Noto Sans TC;
      color: up(sub-title);
      width: 70%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
