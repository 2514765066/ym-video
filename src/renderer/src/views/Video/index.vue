<template>
  <section class="f-1 o-h">
    <webview
      class="wh-100"
      v-show="selectedID"
      :data-name="selectedID"
      :src="`https://jx.xmflv.com/?url=${selectedVideo?.url}`"
    ></webview>
  </section>
</template>

<script setup lang="ts">
import { useListStore } from "@/stores/useListStore";
import { load } from "@/hooks/useVideo";
import { WebView } from "@type";

const { selectedVideo, selectedID } = storeToRefs(useListStore());

const observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    const el = mutation.target as WebView;

    if (el.dataset.name == selectedID.value) {
      const url = el.src.split("https://jx.xmflv.com/?url=")[1];
      selectedVideo.value!.url = url;
    }
  }
});

onMounted(() => {
  //获取元素
  const webview = document.querySelector("webview") as WebView;

  //开发者工具
  webview.addEventListener("dom-ready", () => {
    webview.openDevTools();
  });

  //监视属性
  observer.observe(webview, {
    attributes: true,
    attributeFilter: ["src", "data-name"],
  });

  //添加css和js
  webview.addEventListener("did-finish-load", () => {
    if (!selectedVideo.value) return;

    const { importCss, importJs } = load();

    importCss();
    importJs();
  });
});
</script>

<style scoped lang="scss">
section {
  margin: 0 0.5rem 0.5rem;
  background-color: #131313;
  border-radius: 0.5rem;
}
</style>
