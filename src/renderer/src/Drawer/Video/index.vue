<template>
  <Drawer v-model="showable">
    <main class="wh-100 h">
      <TitleBar @close="handleClose" @update="handleUpdate" />

      <div class="o-h h-100">
        <YmVideoPlayer
          width="100%"
          height="100%"
          :list="selectedVideo!.url"
          v-model="selectedVideo!.history"
        />
      </div>
    </main>
  </Drawer>
</template>

<script setup lang="ts">
import "ym-video-player/es/index.css";
import { YmVideoPlayer } from "ym-video-player";
import Drawer from "../index.vue";
import TitleBar from "./TitleBar.vue";
import eventEmitter from "@/hooks/eventEmitter";
import { useVideoStore } from "@/stores/useVideoStore";

const { selectedVideo } = storeToRefs(useVideoStore());

//是否可见
const showable = ref(false);

//关闭Drawer
const handleClose = () => {
  showable.value = false;
};

//处理更新
const handleUpdate = async () => {
  selectedVideo.value!.url = await api.getUrl(selectedVideo.value!.name);
};

//事件触发
eventEmitter.on("video:show", () => {
  showable.value = true;
});
</script>

<style scoped lang="scss">
main {
  padding: 0 0.5rem 0.5rem;
  background-color: #1f1f1f;

  > div:last-child {
    border-radius: 0.5rem;
    background-color: #131313;
    border: 1px solid #363b3f;
  }
}
</style>
