import FP_TodoList from "@/views/FunctionalProgram.vue";
import { mount } from "@vue/test-utils";

describe("TodoList", () => {
  it("emit a count when setClick button is clicked", async () => {
    const wrapper: any = mount(FP_TodoList);

    await wrapper.find('[data-test="setClick"]').trigger("click");
    expect(wrapper.emitted("count")[0][0].count).toBe(1);

    await wrapper.find('[data-test="setClick"]').trigger("click");
    expect(wrapper.emitted("count")[1][0].count).toBe(2);

    expect(wrapper.emitted("count")[1]).toEqual([
      {
        count: 2,
        isEven: true,
      },
    ]);

    expect(wrapper.emitted("count")).toHaveLength(2);
  });
  it("input", async () => {
    const wrapper = mount(FP_TodoList);
    const input: any = wrapper.find('[data-test="input"]');
    await input.setValue("test@example.com");

    expect(input.element.value).toBe("test@example.com");
  });
  it("setSubmit", async () => {
    const wrapper = mount(FP_TodoList);
    await wrapper.find('[data-test="setSubmit"]').trigger("click");
    expect(wrapper.emitted()).toHaveProperty("submit");
  });
  it("emits the input to its parent", async () => {
    const wrapper: any = mount(FP_TodoList);
    await wrapper.find('[data-test="input"]').setValue("test@example.com");
    await wrapper.find('[data-test="setSubmit"]').trigger("click");
    expect(wrapper.emitted("submit")[0][0]).toBe("test@example.com");
  });
  it("submit a form", async () => {
    const wrapper: any = mount(FP_TodoList);

    const email = "name@mail.com";
    const description = "Lorem ipsum dolor sit amet";
    const city = "moscow";

    await wrapper.find("input[type=email]").setValue("name@mail.com");
    await wrapper.find("textarea").setValue("Lorem ipsum dolor sit amet");
    await wrapper.find("select").setValue("moscow");
    await wrapper.find("input[type=checkbox]").setValue();
    await wrapper.find("input[type=radio][value=monthly]").setValue();

    // prevent 其實不用測 vue已經了
    // trigger 第二事件參數 relatedTarget: componentToGetFocus.element
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.emitted("submit")[0][0]).toStrictEqual({
      email,
      description,
      city,
      subscribe: true,
      interval: "monthly",
    });
  });
});
