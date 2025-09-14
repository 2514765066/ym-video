<template>
  <section class="h-9 flex items-center relative">
    <div class="flex items-center gap-3 mr-auto">
      <List />
    </div>

    <div class="flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
      <Pre />

      <Play />

      <Next />
    </div>

    <div class="flex items-center gap-3">
      <PlayRate />

      <Pip />

      <Fullscreen />
    </div>
  </section>
</template>

<script setup lang="ts">
import Play from "./Play.vue";
import Next from "./Next.vue";
import Pre from "./Pre.vue";
import List from "./List.vue";
import PlayRate from "./PlayRate.vue";
import Pip from "./Pip.vue";
import Fullscreen from "./Fullscreen.vue";
</script>

<style scoped lang="scss"></style>
