<template>
  <Tip content="上一集" :append-to="playerRef">
    <button :disabled="selectedVideo.history == 0" @click="pre">
      <Icon name="next" size="22" color="#ffffffcf" class="rotate-180" />
    </button>
  </Tip>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { playerRef } from "@player/hooks/useEl";
import { Tip } from "@/components/Tooltip";
import { useVideoStore } from "@/stores/useVideoStore";

const { selectedVideo } = storeToRefs(useVideoStore());

const pre = () => {
  selectedVideo.value.history--;
};
</script>

<style scoped lang="scss">
button {
  &:disabled {
    opacity: 0.4;
  }
}
</style>
