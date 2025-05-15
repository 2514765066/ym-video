<template>
  <YmVideoPlayer width="100%" height="100%" v-model="selectedVideo" />
</template>

<script setup lang="ts">
// import "E:/Project/前端/ym-video-player/es/index.css";
// import { YmVideoPlayer } from "E:/Project/前端/ym-video-player/es";
import "ym-video-player/es/index.css";
import { YmVideoPlayer } from "ym-video-player";
import { useVideoStore } from "@/stores/useVideoStore";

const { selectedVideo } = storeToRefs(useVideoStore());
</script>

<style scoped lang="scss"></style>
