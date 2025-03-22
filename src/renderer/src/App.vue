<template>
  <div class="app w-screen h-screen grid" v-if="isOnline">
    <TitleBar />
    <ListBar />

    <RouterView />

    <Menu />
  </div>

  <Disconnect v-else />
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import Disconnect from "@/views/Disconnect/index.vue";
import TitleBar from "@/components/TitleBar/index.vue";
import ListBar from "@/components/ListBar/index.vue";
import eventEmitter from "./hooks/eventEmitter";
import { Menu } from "@/lib/Menu";

eventEmitter.on("error:show", (message: string) => {
  ElMessage({
    plain: true,
    message,
    type: "error",
    grouping: true,
  });
});

eventEmitter.on("success:show", (message: string) => {
  ElMessage({
    plain: true,
    message,
    type: "success",
    grouping: true,
  });
});

// 网络是否可用
const isOnline = ref(navigator.onLine);

//处理断网事件
window.addEventListener("offline", () => {
  isOnline.value = false;
});

//处理网络恢复事件
window.addEventListener("online", () => {
  isOnline.value = true;
});
</script>

<style lang="scss">
.app {
  grid-template-rows: 44px calc(100vh - 44px);
  grid-template-columns: 240px calc(100vw - 240px);

  grid-template-areas:
    "list-bar title-bar"
    "list-bar content";

  background-color: #191919;
}
</style>
