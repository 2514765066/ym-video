<template>
  <video
    class="w-full h-full bg-black"
    ref="videoRef"
    @click="toggle"
    @timeupdate="handleTimeUpdate"
    @progress="handleBufferedTime"
    @loadedmetadata="handleLoad"
    @play="play"
    @pause="pause"
    @ended="next"
  />

  <!-- <img src="@/assets/images/1.jpg" class="w-full h-full" /> -->
</template>

<script setup lang="ts">
import { videoRef } from "@player/hooks/useEl";
import { toggle, play, pause } from "@player/hooks/usePlay";
import {
  videoDuration,
  videoCurrentTime,
  videoBufferedTime,
} from "@player/hooks/useTime";
import { useVideoStore } from "@/stores/useVideoStore";

const { selectedVideo } = storeToRefs(useVideoStore());

//下一集
const next = () => {
  if (!(selectedVideo.value.history < selectedVideo.value.url.length - 1)) {
    return;
  }

  selectedVideo.value.history++;
  selectedVideo.value.currentTime = 0;
};

//获取播放事件
const handleTimeUpdate = () => {
  if (!videoRef.value) {
    return;
  }

  videoCurrentTime.value = videoRef.value.currentTime;
};

//更新缓冲区的事件
const handleBufferedTime = () => {
  if (!videoRef.value) {
    return;
  }

  const buffered = videoRef.value.buffered.end(
    videoRef.value.buffered.length - 1
  );

  videoBufferedTime.value = buffered;
};

//处理加载完成
const handleLoad = () => {
  if (!videoRef.value) {
    return;
  }

  videoDuration.value = videoRef.value.duration;
  videoCurrentTime.value = selectedVideo.value.currentTime;
  videoRef.value.currentTime = selectedVideo.value.currentTime;
};
</script>

<style scoped lang="scss"></style>
