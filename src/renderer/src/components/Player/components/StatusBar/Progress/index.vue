<template>
  <section class="flex items-center gap-2">
    <span class="text-sm text-main">
      {{ formatTime(selectEpisode.currentTime) }}
    </span>

    <Bar />

    <span class="text-sm text-main">
      {{ formatTime(selectEpisode.duration) }}
    </span>
  </section>
</template>

<script setup lang="ts">
import Bar from "./Bar.vue";
import { formatTime } from "@/utils/time";
import { useVideoStore } from "@/stores/useVideoStore";

const { selectEpisode } = storeToRefs(useVideoStore());
</script>

<style scoped lang="scss"></style>
