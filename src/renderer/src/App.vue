<template>
  <TitleBar />

  <ListBar />

  <router-view v-slot="{ Component }">
    <keep-alive :include="['Home', 'Movie', 'Tv', 'History']">
      <component :is="Component" />
    </keep-alive>
  </router-view>

  <Video />
  <LineTip />
  <NewFunc />
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import TitleBar from "@/components/TitleBar.vue";
import ListBar from "@/components/ListBar/index.vue";
import Video from "@/Drawer/Video/index.vue";
import eventEmitter from "./hooks/eventEmitter";
import LineTip from "./components/LineTip.vue";
import NewFunc from "./components/NewFunc.vue";
import { useVersionStore } from "@/stores/useVersionStore";

const { checkForUpdates } = useVersionStore();

checkForUpdates();

eventEmitter.on("error:show", (message: string) => {
  ElMessage({
    message,
    type: "error",
    grouping: true,
  });
});

eventEmitter.on("success:show", (message: string) => {
  ElMessage({
    message,
    type: "success",
    grouping: true,
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
