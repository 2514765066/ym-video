<template>
  <ul class="v fw-w g-1r">
    <MovieInfo v-for="item of tvData" :key="item.id" :data="item" />
  </ul>
</template>

<script setup lang="ts">
import MovieInfo from "@/components/MovieInfo.vue";
import { useMovieStore } from "@/stores/useMovieStore";

const { tvData } = storeToRefs(useMovieStore());
</script>

<style scoped lang="scss"></style>
