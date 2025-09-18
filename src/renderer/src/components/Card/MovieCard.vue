<template>
  <section class="movie-info">
    <Info :data="data" @play="handlePlay" />
  </section>
</template>

<script setup lang="ts">
import Info from "./index.vue";
import { MovieInfo } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";
import { openLoading, closeLoading } from "@/components/Loading";

const { play } = useVideoStore();

const data = defineModel<MovieInfo>({ required: true });

const handlePlay = async () => {
  openLoading();

  await play(data.value.name);

  closeLoading();
};

onMounted(async () => {
  data.value.pic = await ipcRenderer.invoke("getImg", data.value.pic);
});
</script>

<style scoped lang="scss">
.movie-info {
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
