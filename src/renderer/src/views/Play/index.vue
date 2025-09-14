<template>
  <Player v-model="selectedVideo" v-if="selectedVideo?.url" />

  <Tip msg="哎呀，无播放链接。请删除、重新导入或点击更新集数。" v-else />
</template>

<script setup lang="ts">
import Player from "@/components/Player/index.vue";
import Tip from "@/components/Tip.vue";
import { useVideoStore } from "@/stores/useVideoStore";

const { selectedVideo } = storeToRefs(useVideoStore());
</script>

<style scoped lang="scss"></style>
