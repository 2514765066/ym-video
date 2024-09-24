<template>
  <section class="titlebar v-n-c">
    <VideoSet v-if="selectedVideo" />
    <Logo v-else />

    <Command />

    <Control class="ml" />
  </section>
</template>

<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import VideoSet from "@/components/VideoSet.vue";
import Command from "@/components/Command.vue";
import Control from "@/components/Control.vue";
import { useVideoStore } from "@/stores/useVideoStore";

const { selectedVideo } = storeToRefs(useVideoStore());
</script>

<style scoped lang="scss">
.titlebar {
  padding-left: 0.5rem;
  height: 38px;
  -webkit-app-region: drag;
}
</style>
