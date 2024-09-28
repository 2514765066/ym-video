<template>
  <Drawer v-model="visible" @open="handleOpen" @close="handleClose">
    <webview
      class="wh-100"
      id="videoSite"
      :src="src"
      allowpopups
      v-show="!isLoading"
    ></webview>

    <img src="@/assets/svg/loading.svg" class="loading" v-show="isLoading" />

    <template #header="{ close }">
      <TitleBar
        :isLoading="isLoading"
        @back="handleBack"
        @select="handleSelect"
        @close="close"
      />
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import TitleBar from "./TitleBar.vue";
import Drawer from "@/components/Drawer.vue";
import { useVideoSite } from "@/hooks/useVideoSite";
import { WebView } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";
import { useVideoSiteStore } from "@/stores/useVideoSiteStore";
import eventEmitter from "@/hooks/eventEmitter";

const { initCss } = useVideoSite();
const { selectedVideoSite } = storeToRefs(useVideoSiteStore());
const { add } = useVideoStore();

//webview实例
const videoSiteElemnt = ref<WebView>();

//网页地址
const src = ref("");

//是否需要保存更新网址
const isObserver = ref(false);

//抽屉是否可见
const visible = ref(false);

//是否在加载
const isLoading = ref(true);

//处理打开抽屉
const handleOpen = () => {
  if (videoSiteElemnt.value == null) {
    videoSiteElemnt.value = document.querySelector("#videoSite") as WebView;
  }
};

//处理关闭
const handleClose = () => {
  isObserver.value = false;

  src.value = "about:blank";
};

//处理添加
const handleSelect = () => {
  const name = videoSiteElemnt.value!.getTitle();
  const url = videoSiteElemnt.value!.src;

  add(name, url);

  visible.value = false;
};

//处理后退
const handleBack = () => {
  const url = selectedVideoSite.value.history.pop();

  videoSiteElemnt.value!.src = url;
};

const observer = new MutationObserver(mutationsList => {
  const element = mutationsList[0].target as WebView;

  if (isObserver.value) {
    selectedVideoSite.value.history.push(element.src);
  }
});

//webview初始化后使用
watch(
  videoSiteElemnt,
  () => {
    //监视属性
    observer.observe(videoSiteElemnt.value!, {
      attributes: true,
      attributeFilter: ["src"],
    });

    videoSiteElemnt.value?.addEventListener("did-finish-load", async e => {
      const target = e.target as WebView;

      initCss();

      await electron.ipcRenderer.invoke(
        "denyNewWindow",
        target.getWebContentsId()
      );

      isLoading.value = false;
    });
  },
  {
    once: true,
  }
);

eventEmitter.on("videoSite:show", url => {
  isObserver.value = url ? false : true;

  src.value = url || selectedVideoSite.value.url;

  visible.value = true;
});
</script>

<style scoped lang="scss"></style>
