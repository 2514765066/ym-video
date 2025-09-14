<template>
  <Tip content="下一集" :append-to="playerRef">
    <button
      :disabled="selectedVideo.history == selectedVideo.url.length - 1"
      @click="next"
    >
      <Icon name="next" size="22" color="#ffffffcf" />
    </button>
  </Tip>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { Tip } from "@/components/Tooltip";
import { useVideoStore } from "@/stores/useVideoStore";
import { playerRef } from "@player/hooks/useEl";

const { selectedVideo } = storeToRefs(useVideoStore());

const next = () => {
  selectedVideo.value.history++;
};
</script>

<style scoped lang="scss">
button {
  &:disabled {
    opacity: 0.4;
  }
}
</style>
