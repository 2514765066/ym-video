import "element-plus/theme-chalk/dark/css-vars.css";
import "@/assets/global.scss";
import Icon from "@/components/Icon.vue";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.component("Icon", Icon);

app.mount("#app");
