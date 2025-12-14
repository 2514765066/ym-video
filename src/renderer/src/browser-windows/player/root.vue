<template>
  <div class="player-window wh-screen grid bg-bg">
    <TitleBar />

    <div class="flex">
      <Content />

      <EpisodeList />
    </div>
  </div>
</template>

<script setup lang="ts">
import EpisodeList from "@player/components/episode-list/index.vue";
import TitleBar from "@player/components/title-bar/index.vue";
import Content from "@player/views/index.vue";
import { useHistoryStore } from "@player/stores/useHistoryStore";

const { saveHistory } = useHistoryStore();

onMounted(() => {
  window.addEventListener("beforeunload", saveHistory);
});
</script>

<style scoped lang="scss">
.player-window {
  grid-template-rows: 44px calc(100vh - 44px);
  grid-template-columns: 100vw;

  grid-template-areas:
    "title-bar"
    "content";
}
</style>
