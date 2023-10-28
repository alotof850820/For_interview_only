<template>
  <div class="home-container">
    <setting-card
      v-for="(item, index) in settingData"
      :key="index"
      v-bind="item"
      :width="cardWidth"
      @click="router.push({ name: item.pathName })"
    ></setting-card>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, onMounted } from "vue";
import settingCard from "@/components/SettingCard.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const settingData = ref<any>([]);
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
      title: "VueTest",
      pathName: "VueTest",
      content: "VueTest",
    },
    {
      title: "PostView",
      pathName: "PostView",
      content: "PostView",
    },
    {
      title: "FunctionalProgram",
      pathName: "FunctionalProgram",
      content: "FunctionalProgram",
    },
    {
      title: "ThirdUITest",
      pathName: "ThirdUITest",
      content: "ThirdUITest",
    },
    {
      title: "testSlots",
      pathName: "testSlots",
      content: "testSlots",
    },
    {
      title: "testAPI",
      pathName: "testAPI",
      content: "testAPI",
    },
    {
      title: "PiniaView",
      pathName: "PiniaView",
      content: "PiniaView",
    },
  ];
  getRowsMaxCard();
};

const getRowsMaxCard = () => {
  const outer: HTMLDivElement | null =
    document.querySelector(".home-container");
  const cards: NodeListOf<HTMLDivElement> | null =
    document.querySelectorAll(".setting-card");
  const defaultCardWidthn: number = 130;
  const defaultMargin: number = 8;
  if (outer && cards) {
    const _outerWidth: number = outer.offsetWidth - 48;
    const rowsCardsCount: number = Math.floor(
      _outerWidth / (defaultCardWidthn + defaultMargin * 2)
    );
    if (_outerWidth <= defaultCardWidthn + defaultMargin * 2) {
      cardWidth.value = _outerWidth - defaultMargin * 2 - 10;
      return;
    }
    if (cards.length > rowsCardsCount) {
      cardWidth.value =
        (_outerWidth - rowsCardsCount * defaultMargin * 2) / rowsCardsCount -
        10;
    }
  }
};

onBeforeMount(() => window.removeEventListener("resize", getRowsMaxCard));

onMounted(() => window.addEventListener("resize", getRowsMaxCard));

getSettingData();
</script>
<style scoped lang="scss">
.home-container {
  width: 100%;
  min-height: calc(100vh - 34px - 48px);
  overflow-y: auto;
}
</style>
