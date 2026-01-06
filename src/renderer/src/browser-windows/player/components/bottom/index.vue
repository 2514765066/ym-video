<template>
  <section class="w-full absolute bottom-0 left-0 z-30">
    <div
      class="px-4 flex flex-col gap-3"
      v-if="!isFullscreen || controlVisible"
    >
      <Controls v-show="!seekVisible" />

      <Progress />
    </div>

    <div class="progress h-0.5 bg-main rounded-full" v-else></div>
  </section>
</template>

<script setup lang="ts">
import Controls from "./bottom-controls/index.vue";
import Progress from "./bottom-progress/index.vue";
import {
  seekVisible,
  currentTimePrecent,
} from "@/browser-windows/player/stores/useProgressStore";
import { controlVisible } from "@player/stores/useControlStore";
import { useVideoStore } from "@player/stores/useVideoStore";

const { isFullscreen } = storeToRefs(useVideoStore());
</script>

<style scoped lang="scss">
.progress {
  width: calc(v-bind("currentTimePrecent") * 1%);
}
</style>
