import testAPI from "@/views/testAPI.vue";
import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";
import { vi } from "vitest";
import { defineComponent, h, inject, nextTick } from "vue";

const mockPostList = [
  { id: 1, title: "title1" },
  { id: 2, title: "title2" },
];

vi.spyOn(axios, "get").mockResolvedValue(mockPostList);

it("loads posts on button click", async () => {
  const wrapper = mount(testAPI);

  await wrapper.get("button").trigger("click");
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith("/api/posts");
  await flushPromises();

  const posts = wrapper.findAll('[data-test="post"]');

  expect(posts).toHaveLength(2);
  expect(posts[0].text()).toContain("title1");
  expect(posts[1].text()).toContain("title2");
});

it("displays loading state on button click", async () => {
  const wrapper = mount(testAPI);

  expect(wrapper.find('[role="alert"]').exists()).toBeFalsy();
  expect(wrapper.get("button").attributes()).not.toHaveProperty("disabled");

  await wrapper.get("button").trigger("click");

  expect(wrapper.find('[role="alert"]').exists()).toBeTruthy();

  expect(wrapper.get("button").attributes()).toHaveProperty("disabled");

  await flushPromises();
  expect(wrapper.find('[role="alert"]').exists()).toBeFalsy();

  expect(wrapper.get("button").attributes()).not.toHaveProperty("disabled");
});

it("renders a greeting", () => {
  const wrapper = mount(testAPI, {
    props: {
      msg1: "Hello",
    },
  });

  // console.log(wrapper.vm.hasOwnProperty);

  expect(wrapper.html()).toContain("Hello world");
});

it("asserts correct props are passed", () => {
  const Foo = {
    props: ["msg"],
    template: `<div>{{ msg }}</div>`,
  };

  const Comp = {
    components: { Foo },
    template: `<div><foo msg="hello world" /></div>`,
  };

  const wrapper = mount(Comp);

  expect(wrapper.getComponent(Foo).vm.msg).toBe("hello world");
  expect(wrapper.getComponent(Foo).props()).toEqual({ msg: "hello world" });
});

it("provides correct data", () => {
  const TestComponent = defineComponent({
    template: '<span id="provide-test">{{value}}</span>',
    setup() {
      const value = inject("my-key");
      return { value };
    },
  });
  // h 其实代表的是 hyperscript 。它是 HTML 的一部分，表示的是超文本标记语言，当我们正在处理一个脚本的时候，在虚拟 DOM 节点中去使用它进行替换已成为一种惯例。这个定义同时也被运用到其他的框架文档中
  const wrapper = mount(testAPI, {
    slots: {
      default: () => h(TestComponent),
    },
  });

  expect(wrapper.find("#provide-test").text()).toBe("some-data");
});

it("renders correct data", () => {
  const wrapper = mount(testAPI, {
    global: {
      provide: {
        "my-key": "some-data",
      },
    },
  });

  expect(wrapper.text()).toContain("some-data");
});
