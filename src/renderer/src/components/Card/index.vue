<template>
  <Skeleton :loading="loading">
    <li
      class="flex flex-col relative overflow-hidden rounded-lg cursor-pointer"
      @click="emits('play')"
    >
      <img :src="data.pic" class="w-full h-full" />

      <div class="w-full p-2 flex items-center absolute bottom-0">
        <p class="text-sm text-main text-ellipsis overflow-hidden">
          {{ data.name }}
        </p>
      </div>
    </li>
  </Skeleton>
</template>

<script setup lang="ts">
import Skeleton from "./Skeleton.vue";
import { VideoInfo, MovieInfo } from "@type";

withDefaults(
  defineProps<{
    data: VideoInfo | MovieInfo;
    loading?: boolean;
  }>(),
  {
    loading: false,
  }
);

const emits = defineEmits<{
  play: [];
}>();
</script>

<style scoped lang="scss">
li {
  min-width: 160px;
  max-width: 185px;
  width: 100%;
  aspect-ratio: 2/3;

  box-shadow: 0 1px 5px 2px rgba(#000, 0.2);

  > div:last-child {
    height: 40px;

    background-color: rgba(#252525, 0.4);
    backdrop-filter: blur(100px);
  }
}
</style>
