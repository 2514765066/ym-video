<template>
  <Tip :content="content" :append-to="playerRef">
    <button @click="toggle">
      <Icon name="pause" size="22" color="#ffffffcf" v-show="isPlay" />
      <Icon name="play" size="22" color="#ffffffcf" v-show="!isPlay" />
    </button>
  </Tip>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { playerRef } from "@player/hooks/useEl";
import { Tip } from "@/components/Tooltip";
import { isPlay, toggle } from "@player/hooks/usePlay";

const content = computed(() => (isPlay.value ? "暂停" : "播放"));
</script>

<style scoped lang="scss"></style>
