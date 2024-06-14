import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import vue from "@vitejs/plugin-vue";
import ElementPlus from "unplugin-element-plus/vite";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: ["src/preload/index.ts", "src/preload/video.ts"],
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
          assetFileNames: "[name].[ext]",
        },
      },
    },
  },
  renderer: {
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
