import testSlots from "@/views/testSlots.vue";
import { mount, flushPromises } from "@vue/test-utils";
import { nextTick } from "vue";
import axios from "axios";
import { vi } from "vitest";

vi.spyOn(axios, "get").mockResolvedValue({ data: "some mocked data!" });

it("layout default slot", () => {
  const wrapper = mount(testSlots, {
    slots: {
      default: "Main Content",
    },
  });

  expect(wrapper.find('[data-test="first"]').text()).toContain("Main Content");
});
it("layout full page layout", () => {
  const wrapper = mount(testSlots, {
    slots: {
      header: "Header",
      main: "Main",
      footer: "Footer",
    },
  });

  expect(wrapper.html()).toContain("Header");
  expect(wrapper.html()).toContain("Main");
  expect(wrapper.html()).toContain("Footer");
});
it("layout full page layout", () => {
  const wrapper = mount(testSlots, {
    slots: {
      default: ['<div id="one">One</div>', '<div id="two">Two</div>'],
    },
  });
  expect(wrapper.find("#one").exists()).toBe(true);
  expect(wrapper.find("#two").exists()).toBe(true);
});
it("scoped slot", async () => {
  const wrapper = mount(testSlots, {
    slots: {
      scoped: `<template #scoped="scope">Hello{{scope.msg}} </template>`,
    },
  });

  expect(wrapper.html()).toContain("world");
});

it("++", async () => {
  const wrapper = mount(testSlots);
  wrapper.find("button").trigger("click");

  await nextTick();
  console.log(wrapper.html());

  expect(wrapper.html()).toContain("Count: 1");
});

it("mocked axios HTTP client and flushPromises", async () => {
  const wrapper = mount(testSlots);
  await flushPromises();
  //  axios request has resolved with the mocked data.
});
