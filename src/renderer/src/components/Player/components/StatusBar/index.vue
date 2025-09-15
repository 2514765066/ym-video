<template>
  <section
    class="status-bar w-full px-3 py-1 flex flex-col gap-1 absolute left-0 bottom-0"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    v-show="controlVisible"
  >
    <Title />

    <Progress />

    <Controls />
  </section>

  <div
    class="status-progress h-0.5 rounded-full absolute left-0 bottom-0 bg-main"
    v-show="!controlVisible"
  ></div>
</template>

<script setup lang="ts">
import Title from "./Title.vue";
import Progress from "./Progress/index.vue";
import Controls from "./Controls/index.vue";
import { isHover, controlVisible } from "@player/hooks/useBottom";
import { useVideoStore } from "@/stores/useVideoStore";

const { selectEpisode } = storeToRefs(useVideoStore());
</script>

<style scoped lang="scss">
.status-bar {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
}

.status-progress {
  width: calc(
    v-bind("(selectEpisode.currentTime/selectEpisode.duration) || 0") * 100%
  );
}
</style>
