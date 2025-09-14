<template>
  <section class="title-bar flex items-center pl-2 gap-1">
    <Nav />

    <VideoTitle />

    <More />
  </section>
</template>

<script setup lang="ts">
import Nav from "./Nav.vue";
import VideoTitle from "./VideoTitle.vue";

import More from "./More.vue";
</script>

<style scoped lang="scss">
.title-bar {
  grid-area: title-bar;
  padding-right: 148px;

  -webkit-app-region: drag;
  * {
    -webkit-app-region: no-drag;
  }
}
</style>
