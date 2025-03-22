<template>
  <webview
    :src="selectedVideo?.url[0]"
    allowfullscreen
    style="width: 100%; height: 100%"
  />
</template>

<script setup lang="ts">
import { useVideoStore } from "@/stores/useVideoStore";
import type { WebviewTag } from "electron";

const { selectedVideo } = storeToRefs(useVideoStore());

onMounted(() => {
  const webview: WebviewTag = document.querySelector("webview")!;

  const observer = new MutationObserver(() => {
    if (!selectedVideo.value) {
      return;
    }

    selectedVideo.value.url[0] = webview.src;
  });

  observer.observe(webview, {
    attributes: true,
    attributeFilter: ["src"],
  });

  webview.addEventListener("dom-ready", () => {
    webview.insertCSS(`
            #adv_wrap_hh{
                display: none !important;
            }
    `);
  });
});
</script>

<style scoped lang="scss"></style>
