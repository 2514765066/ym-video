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
import { reload, webviewRef } from "./index";
import { useConfigStore } from "@/stores/useConfigStore";

const { data } = storeToRefs(useConfigStore());

//是否可见
const showable = ref(false);

//关闭Drawer
const handleClose = () => {
  showable.value = false;
};

//处理点击
const handleSelect = async () => {
  const cookie = await webviewRef.value!.executeJavaScript("document.cookie");

  if (!cookie) {
    eventEmitter.emit("error:show", "请登录后再提交");
    return;
  }

  data.value.cookie = cookie;

  eventEmitter.emit("success:show", "登录成功");

  handleClose();
};

//事件触发
eventEmitter.on("videoSite:show", () => {
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
