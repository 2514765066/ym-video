<template>
  <Info :data="data" :loading="loading" @play="handlePlay" />
</template>

<script setup lang="ts">
import Info from "./index.vue";
import { MovieInfo } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";

const { play } = useVideoStore();

const data = defineModel<MovieInfo>({ required: true });

//图片是否加载完成
const loading = ref(true);

const handlePlay = () => {
  play(data.value.name, data.value.pic);
};

//初始化获取图片
const getPic = async () => {
  try {
    data.value.pic = await ipcRenderer.invoke("getImg", data.value.pic);
  } catch {
    data.value.pic = "";
  }

  loading.value = false;
};

getPic();
</script>

<style scoped lang="scss"></style>
