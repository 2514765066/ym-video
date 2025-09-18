<template>
  <Skeleton :loading="loading" />

  <li
    class="flex flex-col relative overflow-hidden rounded-lg cursor-pointer"
    @click="emits('play')"
    v-show="!loading"
  >
    <img
      :src="src"
      class="w-full h-full"
      @load="handleLoad"
      @error="handleError"
      v-if="src"
    />

    <img src="@/assets/images/default.png" class="w-full h-full" v-else />

    <div class="w-full p-2 flex items-center absolute bottom-0">
      <p class="text-sm text-main text-ellipsis overflow-hidden">
        {{ data.name }}
      </p>
    </div>
  </li>
</template>

<script setup lang="ts">
import Skeleton from "./Skeleton/CardSkeleton.vue";
import { VideoInfo, MovieInfo } from "@type";

const props = defineProps<{
  data: VideoInfo | MovieInfo;
}>();

const emits = defineEmits<{
  play: [];
}>();

//图片资源
const src = ref(props.data.pic);

//是否在加载
const loading = ref(true);

//加载完成
const handleLoad = () => {
  loading.value = false;
};

//加载出错
const handleError = async () => {
  src.value = await ipcRenderer.invoke("getImg", props.data.pic);

  handleLoad();
};
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
