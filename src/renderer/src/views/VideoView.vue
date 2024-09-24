<template>
  <webview
    id="video"
    class="wh-100"
    v-show="selectedVideo"
    :data-name="selectedID"
    :src="`https://jx.xmflv.com/?url=${selectedVideo?.url}`"
  ></webview>

  <div class="g-2 v-c-c fw-w" v-show="!selectedVideo">
    <button
      v-for="({ name }, index) of data"
      :key="name"
      class="fs-20"
      @click="handleClick(index)"
    >
      <img class="w-100" :src="handleSrc(name)" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useVideoSiteStore } from "@/stores/useVideoSiteStore";
import { useVideoStore } from "@/stores/useVideoStore";
import { useVideo } from "@/hooks/useVideo";
import { WebView } from "@type";
import eventEmitter from "@/hooks/eventEmitter";

const { initCSS, initJS } = useVideo();
const { data, selectIndex } = storeToRefs(useVideoSiteStore());
const { selectedVideo, selectedID } = storeToRefs(useVideoStore());

const handleSrc = (name: string) => {
  return new URL(`../assets/videoSiteLogo/${name}.png`, import.meta.url);
};

const handleClick = (index: number) => {
  selectIndex.value = index;

  eventEmitter.emit("videoSite:show");
};

const observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    const el = mutation.target as WebView;

    if (el.dataset.name == selectedID.value) {
      const url = el.src.split("https://jx.xmflv.com/?url=")[1];

      if (url && selectedVideo.value) {
        selectedVideo.value.url = url;
      }
    }
  }
});

onMounted(() => {
  //获取元素
  const webview = document.querySelector("#video") as WebView;

  //监视属性
  observer.observe(webview, {
    attributes: true,
    attributeFilter: ["src", "data-name"],
  });

  //添加css和js
  webview.addEventListener("did-finish-load", () => {
    // webview.openDevTools();
    if (!selectedVideo.value) return;

    initCSS();
    initJS();
  });
});
</script>

<style scoped lang="scss">
div {
  > button {
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #2a2d2e;
    width: 150px;
    height: 100px;
  }
}
</style>
