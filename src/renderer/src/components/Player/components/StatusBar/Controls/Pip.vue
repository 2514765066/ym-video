<template>
  <Tip content="画中画" :append-to="playerRef">
    <button @click="handlePip">
      <Icon name="pip" size="22" color="#ffffffcf" />
    </button>
  </Tip>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { playerRef } from "@player/hooks/useEl";
import { Tip } from "@/components/Tooltip";
import { videoRef } from "@player/hooks/useEl";
import { exit } from "@player/hooks/useFullscreen";

//进入画中画
const handlePip = async () => {
  if (!videoRef.value) {
    return;
  }

  await exit();
  videoRef.value.requestPictureInPicture();
};
</script>

<style scoped lang="scss"></style>
