<template>
  <webview id="video" class="wh-100" :src="src" allowfullscreen></webview>
</template>

<script setup lang="ts">
import { useVideoStore } from "@/stores/useVideoStore";
import { useLineStore } from "@/stores/useLineStore";
import { useCSS, useJS, webviewRef } from "./index";
import { useObsever } from "@/hooks/useObsever";
import { WebView } from "@type";

const { selectedLine } = storeToRefs(useLineStore());
const { selectedVideo, selectedID } = storeToRefs(useVideoStore());

//网页地址
const src = ref("");

//网页id
const id = ref("");

//监控selectedVideo和selectedLine改变重新设置src和id
watchEffect(() => {
  if (!selectedVideo.value) {
    return;
  }

  src.value = `${selectedLine.value}${selectedVideo.value.url}`;
  id.value = selectedVideo.value.id;
});

//初始化
onMounted(() => {
  webviewRef.value = document.querySelector("#video") as WebView;

  //监视属性
  useObsever(
    webviewRef.value,
    () => {
      if (id.value != selectedID.value) {
        return;
      }

      const url = webviewRef.value!.src.split(selectedLine.value)[1];

      if (url && selectedVideo.value) {
        selectedVideo.value.url = url;
      }
    },
    {
      attributes: true,
      attributeFilter: ["src"],
    }
  );

  //添加css和js
  webviewRef.value.addEventListener("did-finish-load", () => {
    useCSS();
    useJS();
  });
});
</script>

<style scoped lang="scss"></style>
