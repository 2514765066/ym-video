<template>
  <Info :data="data" @play="handlePlay" remove />
</template>

<script setup lang="ts">
import Info from "./index.vue";
import { VideoInfo } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";
import eventEmitter from "@/hooks/eventEmitter";

const videoStore = useVideoStore();

const props = defineProps<{
  data: VideoInfo;
  remove?: boolean;
}>();

//处理点击
const handlePlay = async () => {
  videoStore.before(props.data.name);

  eventEmitter.emit("video:show");
};
</script>

<style scoped lang="scss"></style>
