<template>
  <li
    class="w-full h-16 flex items-center gap-3 p-2 rounded-md cursor-pointer"
    @click="handlePlay"
  >
    <img :src="data.pic" class="aspect-square h-full rounded" />

    <div class="flex flex-col">
      <span class="text-main">{{ data.name }}</span>

      <span class="text-main-darken text-sm"> 已观看{{ playPercent }}% </span>
    </div>
  </li>
</template>

<script setup lang="ts">
import { VideoInfo } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";

const { play } = useVideoStore();

const props = defineProps<{
  data: VideoInfo;
}>();

//播放百分比
const playPercent = computed(() => {
  const item = props.data.url[props.data.history];

  return Math.ceil((item.currentTime / item.duration) * 100 || 0);
});

const handlePlay = async () => {
  play(props.data.name);
};
</script>

<style scoped lang="scss"></style>
