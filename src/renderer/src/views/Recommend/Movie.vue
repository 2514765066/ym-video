<template>
  <ul class="v fw-w g-1r">
    <MovieInfo v-for="item of movieData" :key="item.id" :data="item" />
  </ul>
</template>

<script setup lang="ts">
import MovieInfo from "@/components/MovieInfo.vue";
import { useMovieStore } from "@/stores/useMovieStore";

const movieStore = useMovieStore();

const movieData = computed(() => {
  return movieStore.movieData.slice(0, movieStore.movieDataShowCount);
});
</script>

<style scoped lang="scss"></style>
