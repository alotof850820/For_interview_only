import { flushPromises, mount } from "@vue/test-utils";
import axios from "axios";
import { vi } from "vitest";
import { defineComponent, ref } from "vue";

vi.spyOn(axios, "get").mockResolvedValue({ data: { id: 1, name: "User" } });

const useCounter = () => {
  const counter = ref(0);
  const increase = () => (counter.value += 1);
  return { counter, increase };
};
const useUser = (userId: number) => {
  const user = ref();
  const apiGetUser = async (id: number) => {
    const res: any = await axios.get(`users/${id}`);
    user.value = res.data;
  };
  apiGetUser(userId);

  return { user };
};

it("increase counter on call", () => {
  const { counter, increase } = useCounter();

  expect(counter.value).toBe(0);

  increase();

  expect(counter.value).toBe(1);
});

it("fetch user on mount", async () => {
  const TestComponent = defineComponent({
    props: {
      userId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      return useUser(props.userId);
    },
  });

  const wrapper = mount(TestComponent, {
    props: {
      userId: 1,
    },
  });

  expect(wrapper.vm.user).toBeUndefined();
  await flushPromises();
  expect(wrapper.vm.user).toEqual({ id: 1, name: "User" });
});
