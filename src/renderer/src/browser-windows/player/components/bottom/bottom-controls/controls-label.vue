<template>
  <span class="text-3xl text-main text-shadow ellipsis">
    {{ history.name }} ·
    {{ formatRemarks(episodeLabel) }}
  </span>
</template>

<script setup lang="ts">
import { formatRemarks } from "@/utils/format";
import { useHistoryStore } from "@player/stores/useHistoryStore";

const { selectedEpisode, history } = storeToRefs(useHistoryStore());

const episodeLabel = computed(() => {
  return selectedEpisode.value?.label || "";
});
</script>

<style scoped lang="scss"></style>
