<template>
  <Info :data="data" @play="handlePlay" remove />
</template>

<script setup lang="ts">
import Info from "./index.vue";
import { VideoInfo } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";

const { play } = useVideoStore();

const props = defineProps<{
  data: VideoInfo;
}>();

//处理点击
const handlePlay = async () => {
  play(props.data.name);
};
</script>

<style scoped lang="scss"></style>
