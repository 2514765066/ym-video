<template>
  <section class="movie-info">
    <Info :data="data" @play="handlePlay" />
  </section>
</template>

<script setup lang="ts">
import Info from "./index.vue";
import { useVideoStore } from "@/stores/useVideoStore";
import { SearchInfo } from "@type";

const { add } = useVideoStore();

const data = defineModel<SearchInfo>({ required: true });

const handlePlay = async () => {
  add(data.value);
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
