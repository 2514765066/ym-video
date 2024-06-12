import "ym-easy.css/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

import { createApp } from "vue";
import App from "./App.vue";

import pinia from "@/stores";

const app = createApp(App);
app.use(pinia);
app.mount("#app");
