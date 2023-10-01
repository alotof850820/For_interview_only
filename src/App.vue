<template>
  <div class="breadcrumb">
    <div class="breadcrumb-box">
      <a-breadcrumb separator=">">
        <a-breadcrumb-item
          v-for="item in breadCrumbs"
          :key="item.routeName"
          @click="handleBreadcrumbClick(item.routeName, item.query)"
          style="cursor: pointer"
        >
          {{ item.text }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
  </div>

  <router-view class="router-box" />
</template>

<script lang="ts" setup>
import {
  RouterView,
  useRoute,
  useRouter,
  type LocationQueryRaw,
} from "vue-router";
import { computed } from "vue";

const route = useRoute();
const router = useRouter();
const breadCrumbs = computed(() =>
  typeof route.meta.breadCrumb === "function"
    ? route.meta.breadCrumb(route)
    : route.meta.breadCrumb
);

const handleBreadcrumbClick = (routeName: string, query?: LocationQueryRaw) => {
  router.replace({ name: routeName, query: query });
};
</script>

<style lang="scss">
#app {
  width: 100%;
  min-height: 100vh;
  padding: 24px;
  font-family: "Noto Sans TC", "Noto Sans SC", "微軟正黑體", Arial, sans-serif !important;
  color: rgba(99, 99, 99, 1) !important;
  background: up(primary-bg);
}
</style>
<style scoped lang="scss">
.breadcrumb {
  margin-bottom: 8px;
  .breadcrumb-box {
    display: flex;
    justify-content: space-between;

    .user {
      display: flex;
      align-items: center;
      justify-content: center;
      .bell {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 40px;
        height: 40px;
      }
      .user-menu {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 64px;
        height: 40px;

        .user-img {
          width: 32px;
          height: 32px;
          background-color: rgb(71, 44, 157);
          border-radius: 50%;
          margin-right: 3px;
        }
      }
    }
  }
}
.router-box {
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 2px 4px 0px hsba(252, 19%, 84%, 0.16);
  padding: 24px;
  width: 100%;
}
</style>
