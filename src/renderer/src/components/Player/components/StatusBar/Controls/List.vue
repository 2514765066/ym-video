<template>
  <Select
    :data="data"
    v-model="selectedVideo.history"
    v-if="selectedVideo.url.length > 1"
  >
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

const { selectedVideo } = storeToRefs(useVideoStore());

const data = computed(() => {
  const res = selectedVideo.value.url
    .filter(
      item =>
        item.value >= selectedVideo.value.history - 1 &&
        item.value <= selectedVideo.value.history + 1
    )
    .map(item => {
      return {
        label: `第${item.value + 1}集`,
        value: item.value,
      };
    });

  return res;
});
</script>

<style scoped lang="scss"></style>
