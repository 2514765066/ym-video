<template>
  <TitleBar />

  <ListBar />

  <router-view v-slot="{ Component }">
    <keep-alive :include="['Home', 'Recommend']">
      <component :is="Component" />
    </keep-alive>
  </router-view>

  <VideoSite />
  <Video />
  <LineTip />
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import TitleBar from "@/components/TitleBar.vue";
import ListBar from "@/components/ListBar/index.vue";
import VideoSite from "@/Drawer/VideoSite/index.vue";
import Video from "@/Drawer/Video/index.vue";
import eventEmitter from "./hooks/eventEmitter";
import LineTip from "./components/LineTip.vue";

eventEmitter.on("error:show", (message: string) => {
  ElMessage({
    message,
    type: "error",
  });
});

eventEmitter.on("success:show", (message: string) => {
  ElMessage({
    message,
    type: "success",
  });
});
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 38px calc(100vh - 38px);
  grid-template-columns: 320px calc(100vw - 320px);
  background-color: #272727;

  > *:nth-child(1) {
    grid-row: 1/2;
    grid-column: 2/3;
  }

  > *:nth-child(2) {
    grid-row: 1/3;
    grid-column: 1/2;
  }

  > *:nth-child(3) {
    grid-row: 2/3;
    grid-column: 2/3;
  }
}
</style>
