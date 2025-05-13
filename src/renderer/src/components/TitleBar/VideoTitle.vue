<template>
  <section class="h-6 rounded-md flex items-center gap-1.5 px-1.5">
    <img
      :src="selectedVideo.pic"
      class="rounded-full shrink-0 w-5 h-5"
      v-if="selectedVideo?.pic"
    />
    <div class="rounded-full shrink-0 w-5 h-5 bg-gray-700" v-else></div>

    <span class="text-sm text-color">{{ selectedName }}</span>
  </section>
</template>

<script setup lang="ts">
import { useVideoStore } from "@/stores/useVideoStore";

const { selectedVideo, selectedName } = storeToRefs(useVideoStore());
</script>

<style scoped lang="scss">
section {
  transition: 0.1s;

  &:hover {
    background-color: #262626;
  }
}
</style>
