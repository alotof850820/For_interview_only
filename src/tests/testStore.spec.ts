import { createPinia, defineStore, setActivePinia } from "pinia";
import { computed, ref } from "vue";
import { mount } from "@vue/test-utils";
import PiniaView from "@/views/PiniaView.vue";
import { createTestingPinia } from "@pinia/testing";
import { useSampleStore } from "@/store/app";

export const useCounterStore = defineStore("testPinia", () => {
  const count = ref(0);
  const getCount = computed(() => count.value);
  const increment = () => count.value++;
  return {
    count,
    getCount,
    increment,
  };
});

const App = {
  template: `
    <div>
      <button @click="setIncrement" />
      Count: {{ setCount  }}
    </div>
  `,
  setup() {
    const store = useCounterStore();

    const setCount = ref(store.count);
    const setIncrement = () => {
      store.increment();
      setCount.value = store.count;
    };
    return {
      setCount,
      setIncrement,
    };
  },
};

it("testStore", async () => {
  const wrapper = mount(App, {
    global: {
      plugins: [createPinia()],
    },
  });

  await wrapper.find("button").trigger("click");

  expect(wrapper.html()).toContain("Count: 1");
});

const pinia = createTestingPinia();
it("pinia using a mock store", async () => {
  const store = useSampleStore(pinia);

  const wrapper = mount(PiniaView, {
    mocks: {
      $store: store,
    },
  });

  expect(wrapper.html()).toContain("sample");
  await wrapper.find("button").trigger("click");
  expect(store.changeName).toHaveBeenCalled();
});
