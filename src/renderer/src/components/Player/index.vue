<template>
  <section class="player w-full h-full flex overflow-hidden">
    <div
      class="w-full h-full relative"
      ref="playerRef"
      :class="{ 'cursor-none': !controlVisible }"
      @mousemove="handleMouseMove"
    >
      <Video />

      <StatusBar />

      <Volume />
    </div>

    <List />
  </section>
</template>

<script setup lang="ts">
import List from "./components/List/index.vue";
import Video from "./components/Video.vue";
import StatusBar from "./components/StatusBar/index.vue";
import Volume from "./components/Volume.vue";
import { playerRef } from "./hooks/useEl";
import { handleMouseMove, controlVisible } from "./hooks/useBottom";
import { useInit } from "./hooks/useInit";
import { videoCurrentTime, videoDuration, reset } from "./hooks/useTime";
import { useVideoStore } from "@/stores/useVideoStore";

const { selectedVideo } = storeToRefs(useVideoStore());

useInit(selectedVideo);

//切换播放资源的时候保存播放时间
watch(selectedVideo, (_, oldValue) => {
  oldValue.currentTime = videoCurrentTime.value;
  oldValue.duration = videoDuration.value;

  reset();
});

//关闭网页的时候保存播放时间
const save = () => {
  selectedVideo.value.currentTime = videoCurrentTime.value;
  selectedVideo.value.duration = videoDuration.value;
};

//关闭页面保存
onMounted(() => {
  window.addEventListener("beforeunload", save);
});

//保存播放时间
onUnmounted(() => {
  window.removeEventListener("beforeunload", save);
  save();
});
</script>

<style scoped lang="scss">
.cursor-none {
  cursor: none;
}
</style>
