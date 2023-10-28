import ThirdUITest from "@/views/ThirdUITest.vue";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";

const vuetify = createVuetify();

test("emits textarea value on submit", async () => {
  const wrapper: any = mount(ThirdUITest, {
    global: {
      plugins: [vuetify],
    },
  });

  const description = "Some very long text...";

  await wrapper.findComponent({ ref: "description" }).setValue(description);
  await wrapper.find("form").trigger("submit.prevent");
  // expect(wrapper.emitted("submitted")[0][0]).toEqual(description);
});
it("renders an error if length is too short", () => {
  const wrapper = mount(ThirdUITest, {
    global: {
      plugins: [vuetify],
    },
    props: {
      minLength: 1,
      password: "xxxxxx",
    },
  });

  expect(wrapper.html()).toContain("Password must be at least 1 characters.");
});
it("renders greeting when show is true", async () => {
  const wrapper = mount(ThirdUITest, {
    global: {
      plugins: [vuetify],
    },
  });

  expect(wrapper.html()).toContain("Hello");

  await wrapper.setProps({ show: false });

  expect(wrapper.html()).not.toContain("Hello");
});
