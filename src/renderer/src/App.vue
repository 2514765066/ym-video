<template>
  <div class="app w-screen h-screen grid" v-if="isOnline">
    <TitleBar />

    <ListBar />

    <RouterView />
  </div>

  <Disconnect v-else />

  <GlobalSearch />
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import Disconnect from "@/views/Disconnect/index.vue";
import TitleBar from "@/components/TitleBar/index.vue";
import ListBar from "@/components/ListBar/index.vue";
import GlobalSearch from "@/components/GlobalSearch/index.vue";
import eventEmitter from "./hooks/eventEmitter";
import { isOnline } from "@/hooks/useNetwork";

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
    type: "info",
    grouping: true,
  });
});
</script>

<style lang="scss">
.app {
  grid-template-rows: 44px calc(100vh - 44px);
  grid-template-columns: 100vw;

  grid-template-areas:
    "title-bar"
    "content";

  background-color: #191919;
}
</style>
