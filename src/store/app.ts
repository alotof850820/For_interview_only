// Utilities
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSampleStore = defineStore("sample", () => {
  const name = ref("sample");
  const fullName = computed(() => `${name.value}-example`);
  const changeName = (newName: string) => (name.value = newName);

  return {
    name,
    fullName,
    changeName,
  };
});
