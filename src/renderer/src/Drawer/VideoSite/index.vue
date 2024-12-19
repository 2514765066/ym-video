<template>
  <Drawer v-model="showable">
    <main class="wh-100 h">
      <TitleBar @close="handleClose" @select="handleSelect" @reload="reload" />

      <section class="f-1 o-h">
        <WebView />
      </section>
    </main>
  </Drawer>
</template>

<script setup lang="ts">
import WebView from "./WebView.vue";
import Drawer from "../index.vue";
import TitleBar from "./TitleBar.vue";
import eventEmitter from "@/hooks/eventEmitter";
import { reload, src, webviewRef } from "./index";

//是否可见
const showable = ref(false);

//传递过来的函数
const fn = ref();

//关闭Drawer
const handleClose = () => {
  showable.value = false;
};

//处理点击
const handleSelect = () => {
  fn.value(webviewRef.value, handleClose);
};

//事件触发
eventEmitter.on("videoSite:show", (url, func) => {
  src.value = url;
  fn.value = func;
  showable.value = true;
});
</script>

<style scoped lang="scss">
main {
  background-color: #1f1f1f;

  > section:nth-child(2) {
    margin: 0 0.5rem 0.5rem;
    border-radius: 0.5rem;
    background-color: #131313;
    border: 1px solid #363b3f;
  }
}
</style>
