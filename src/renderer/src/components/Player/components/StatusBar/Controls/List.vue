<template>
  <Select :data="data" v-model="selectedVideo.history">
    <button>
      <Tip content="选集" :append-to="playerRef">
        <Icon name="list" size="26" color="#ffffffcf" />
      </Tip>
    </button>
  </Select>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { playerRef } from "@player/hooks/useEl";
import Select from "@player/lib/Select.vue";
import { Tip } from "@/components/Tooltip";
import { useVideoStore } from "@/stores/useVideoStore";

const { selectedVideo, historyList } = storeToRefs(useVideoStore());

const data = computed(() => {
  return historyList.value.filter(
    (_, index) =>
      index >= selectedVideo.value.history - 1 &&
      index <= selectedVideo.value.history + 1
  );
});
</script>

<style scoped lang="scss"></style>
