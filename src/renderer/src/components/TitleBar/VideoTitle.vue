<template>
  <section
    class="h-7 rounded-md flex items-center gap-1.5 px-2 hover:bg-stone-800"
    v-if="route.path == '/play'"
  >
    <img :src="selectedVideo?.pic" class="rounded-full w-5 h-5" />

    <span class="text-sm text-color">{{ selectedName }}</span>
  </section>
</template>

<script setup lang="ts">
import { useVideoStore } from "@/stores/useVideoStore";

const route = useRoute();
const { selectedVideo, selectedName } = storeToRefs(useVideoStore());
</script>

<style scoped lang="scss"></style>
