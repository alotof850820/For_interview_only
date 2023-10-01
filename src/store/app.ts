// Utilities
import { defineStore } from "pinia";

export const useSampleStore = defineStore("sample", {
  state: () => {
    return {
      name: "sample",
    };
  },
  getters: {
    fullName(state) {
      return `${state.name}-example`;
    },
  },
  actions: {
    changeName(newName: string) {
      this.name = newName;
    },
  },
});
