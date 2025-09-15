<template>
  <section class="flex items-center gap-2">
    <span class="text-sm text-main">{{ formatTime(videoCurrentTime) }}</span>

    <Bar />

    <span class="text-sm text-main">{{ formatTime(videoDuration) }}</span>
  </section>
</template>

<script setup lang="ts">
import Bar from "./Bar.vue";
import { videoDuration, videoCurrentTime } from "@player/hooks/useTime";
import { formatTime } from "@/utils/time";
</script>

<style scoped lang="scss"></style>
