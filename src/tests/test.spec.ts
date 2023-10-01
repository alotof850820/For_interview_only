import UnitTest from "@/components/UnitTest.vue";
import List from "@/components/List.vue";
import { mount } from "@vue/test-utils";
import { apiGetAlltodos } from "@/api/apiTodoList";

// toBe(===) toEqual(物件相等) toBeNull(值為 null 空的) toBeUndefined(值為 undefined) toBeDefined(值不為 undefined) toBeFalsy(值為 false) toBeTruthy(值為 true) toBeGreaterThan(值大於) toBeGreaterThanOrEqual(值大於等於) toBeLessThan(值小於) toBeLessThanOrEqual(值小於等於) toBeCloseTo(值接近)(0.1+0.2 === 0.3) toMatch(類似匹配array中的某元素(string)) toContain(匹配array包含某元素 ) toThrow(有抛出error就過) .not.toThrow(沒有抛出error就過)(not盡量不要用)

// UnitTest
describe("UnitTest", () => {
  it("UnitTest", () => {
    const wrapper = mount(UnitTest);
    const numberfiled = wrapper.findComponent(UnitTest);
    expect(numberfiled.exists()).toBeTruthy();
  });
});

// List
describe("List", () => {
  it("render todo title", async () => {
    const mockApiData = [
      { userId: 1, title: "Test Todo 1" },
      { userId: 2, title: "Test Todo 2" },
    ];

    const wrapper = mount(List, {
      props: {
        listData: mockApiData,
      },
    });

    // 可以取得元素

    await wrapper.vm.$nextTick();
    const todo = wrapper.get("[data-test='todo']");
    // expect(todo.text()).toBe("test");
  });
});
