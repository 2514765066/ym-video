import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import vue from "@vitejs/plugin-vue";
import ElementPlus from "unplugin-element-plus/vite";
import AutoImport from "unplugin-auto-import/vite";
import { version } from "./package.json";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    define: {
      __APP_VERSION__: JSON.stringify(version),
    },
    resolve: {
      alias: {
        "@": resolve("src/renderer/src"),
        "@type": resolve("src/type/index"),
      },
    },
    plugins: [
      vue(),
      ElementPlus({}),
      AutoImport({
        imports: ["vue", "pinia", "vue-router"],
        dts: true,
      }),
    ],
  },
});
