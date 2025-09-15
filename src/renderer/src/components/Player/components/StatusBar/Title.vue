<template>
  <section class="mb-2 flex items-end gap-2">
    <span class="text-4xl text-main">{{ selectedName }}</span>

    <span class="text-lg text-main">第{{ selectEpisode.value + 1 }}集</span>
  </section>
</template>

<script setup lang="ts">
import { useVideoStore } from "@/stores/useVideoStore";

const { selectedName, selectEpisode } = storeToRefs(useVideoStore());
</script>

<style scoped lang="scss"></style>
