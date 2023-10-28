import { mount } from "@vue/test-utils";

const Editor = {
  props: {
    label: String,
    modelValue: String,
  },
  emits: ["update:modelValue"],
  template: `<div>
    <label>{{label}}</label>
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
  </div>`,
};

it("modelValue should be updated", async () => {
  const wrapper = mount(Editor, {
    props: {
      modelValue: "initialText",
      "onUpdate:modelValue": (e: any) => wrapper.setProps({ modelValue: e }),
    },
  });

  await wrapper.find("input").setValue("test");
  expect(wrapper.props("modelValue")).toBe("test");
});

// 多種的v-model
const MoneyEditor = {
  template: `<div> 
    <input :value="currency" @input="$emit('update:currency', $event.target.value)"/>
    <input :value="modelValue" type="number" @input="$emit('update:modelValue', $event.target.value)"/>
  </div>`,
  props: ["currency", "modelValue"],
  emits: ["update:currency", "update:modelValue"],
};

it("modelValue and currency should be updated", async () => {
  const wrapper = mount(MoneyEditor, {
    props: {
      modelValue: "initialText",
      "onUpdate:modelValue": (e: any) => wrapper.setProps({ modelValue: e }),
      currency: "$",
      "onUpdate:currency": (e: any) => wrapper.setProps({ currency: e }),
    },
  });

  const [currencyInput] = wrapper.findAll("input");

  // await modelValueInput.setValue("test");
  await currencyInput.setValue("£");

  // expect(wrapper.props("modelValue")).toBe("test");
  expect(wrapper.props("currency")).toBe("£");
});
