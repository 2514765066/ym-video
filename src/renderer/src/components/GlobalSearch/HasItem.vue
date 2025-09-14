<template>
  <li
    class="w-full h-16 flex items-center gap-3 p-2 rounded-md cursor-pointer"
    @click="handlePlay"
  >
    <img :src="data.pic" class="aspect-square h-full rounded" />

    <div class="flex flex-col">
      <span class="text-color">{{ data.name }}</span>

      <span class="text-color-darken text-sm">
        已观看{{ Math.floor((data.currentTime / data.duration) * 100) || 0 }}%
      </span>
    </div>
  </li>
</template>

<script setup lang="ts">
import { useVideoStore } from "@/stores/useVideoStore";

const { play } = useVideoStore();

const props = defineProps<{
  data: {
    name: string;
    currentTime: number;
    duration: number;
    pic: string;
  };
}>();

const handlePlay = async () => {
  play(props.data.name);
};
</script>

<style scoped lang="scss"></style>
