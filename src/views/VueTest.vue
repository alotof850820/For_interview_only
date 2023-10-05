<template>
  <div class="container">
    <div class="title">文章</div>
    <unit-test :width="cardWidth"></unit-test>
  </div>
</template>

<script lang="ts" setup>
import UnitTest from "@/components/UnitTest.vue";
import { onMounted } from "vue";
import { onBeforeMount } from "vue";
import { ref } from "vue";

const cardWidth = ref<number>(251);
const getRowsMaxCard = () => {
  const outer: HTMLDivElement | null = document.querySelector(".container");
  const cards: NodeListOf<HTMLDivElement> | null =
    document.querySelectorAll(".unit-test");
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
</script>
<style lang="scss" scoped>
.container {
  width: 100%;

  .title {
    background-color: black;
    text-align: center;
    color: white;
    margin-bottom: 5px;
  }
}
</style>
