<template>
  <Tip :content="content" :append-to="playerRef">
    <button @click="toggle">
      <Icon
        name="fullscreen-off"
        size="22"
        color="#ffffffcf"
        v-show="isFullscreen"
      />
      <Icon
        name="fullscreen-on"
        size="22"
        color="#ffffffcf"
        v-show="!isFullscreen"
      />
    </button>
  </Tip>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { playerRef } from "@player/hooks/useEl";
import { isFullscreen } from "@player/hooks/useFullscreen";
import { Tip } from "@/components/Tooltip";
import { toggle } from "@player/hooks/useFullscreen";

const content = computed(() => (isFullscreen.value ? "退出全屏" : "全屏"));
</script>

<style scoped lang="scss"></style>
