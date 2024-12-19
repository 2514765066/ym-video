<template>
  <webview id="videoSite" class="wh-100" :src="src" />
</template>

<script setup lang="ts">
import { WebView } from "@type";
import { webviewRef, src } from "./index";

//初始化
onMounted(() => {
  webviewRef.value = document.querySelector("#videoSite") as WebView;
  webviewRef.value.addEventListener("did-finish-load", () => {
    webviewRef.value!.setAudioMuted(true);
  });
});
</script>

<style scoped lang="scss"></style>
