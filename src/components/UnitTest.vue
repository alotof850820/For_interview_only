<template>
  <div class="post-box">
    <div class="post-card">
      <div class="post-title">我好像..............................</div>

      <div>
        <div class="user-title">
          <img class="user-img" src="" alt="" />
          <div class="name">張杰攻</div>
          <div class="time">2021.09.12</div>
        </div>
        <div class="post-content">
          <div class="post-text">有甚麼人......................</div>
          <div class="img-box">
            <img class="post-img" src="" alt="" />
          </div>
        </div>
      </div>

      <div class="post-footer">
        <div class="post-tag">美文</div>
        <div class="post-tag">故事</div>
        <div class="post-tag">精選優質</div>
        <div class="post-tag">點讚 231 -</div>
        <div class="post-tag">收藏 34 -</div>
        <div class="post-tag">評論 34 -</div>
        <div class="post-tag">觀看 786</div>
      </div>
    </div>

    <div class="post-card">
      <div class="post-title">我好像.....</div>
      <div>
        <div class="user-title">
          <img class="user-img" src="" alt="" />
          <div class="name">張杰攻</div>
          <div class="time">2021.09.12</div>
        </div>
        <div class="post-content">
          <div class="post-text">有甚麼人......................</div>
          <div class="img-box">
            <img class="post-img" src="" alt="" />
            <img class="post-img" src="" alt="" />
            <img class="post-img" src="" alt="" />
            <img class="post-img" src="" alt="" />
            <img class="post-img" src="" alt="" />
            <img class="post-img" src="" alt="" />
            <img class="post-img" src="" alt="" />
            <img class="post-img" src="" alt="" />
          </div>
        </div>
      </div>

      <div class="post-footer">
        <div class="post-tag">美文</div>
        <div class="post-tag">故事</div>
        <div class="post-tag">精選優質</div>
        <div class="post-tag">點讚 231 -</div>
        <div class="post-tag">收藏 34 -</div>
        <div class="post-tag">評論 34 -</div>
        <div class="post-tag">觀看 786</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { computed } from "vue";
const defaultWidth = ref<number>(251);
const props = withDefaults(defineProps(), {
  width: 151,
});
const ratio = computed(() => props.width / defaultWidth.value);
</script>
<style lang="scss" scoped>
.post-box {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  height: 100%;

  .post-card {
    border: 1px solid red;
    padding: 10px;
    .user-title {
      display: flex;
      gap: 5px;
      align-items: center;
      .user-img {
        width: 20px;
        height: 20px;
        background-color: blueviolet;
        border-radius: 50%;
      }
    }
    .post-content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .post-text {
        margin-right: auto;
      }
      .img-box {
        .post-img {
          width: 50px;
          height: 50px;
          background-color: aqua;
          margin: 10px;
        }
      }
    }
    .post-footer {
      display: flex;
      gap: 5px;
      width: calc(251px * v-bind(ratio));
      max-width: 100%;
      .post-tag {
        min-width: 40px;
      }
    }
  }
}
</style>
