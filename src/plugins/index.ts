import vuetify from "./vuetify";
import pinia from "../store";
import router from "../router";
import Antd from "ant-design-vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import type { App } from "vue";

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(pinia).use(Antd).use(ElementPlus);
}
