<template>
  <section class="mb-2">
    <span class="text-4xl text-main">{{ selectedName }}</span>
  </section>
</template>

<script setup lang="ts">
import { useVideoStore } from "@/stores/useVideoStore";

const { selectedName } = storeToRefs(useVideoStore());
</script>

<style scoped lang="scss"></style>
