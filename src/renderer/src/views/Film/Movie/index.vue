<template>
  <section class="flex gap-5">
    <MovieCardInfo
      v-for="(item, index) of movieData.slice(0, cardCount)"
      v-model="movieData[index]"
      color="#4b2828"
      :key="item.name"
    />
  </section>

  <GroupTitle title="精选电影" class="mt-4" icon="star" />

  <ul class="gap-4 h-fit grid grid-list" ref="container">
    <MovieInfo
      v-for="(item, index) of movieData.slice(cardCount, count)"
      :key="item.name"
      v-model="movieData[index + cardCount]"
    />
  </ul>
</template>

<script setup lang="ts">
import GroupTitle from "@/components/GroupTitle.vue";
import MovieInfo from "@/components/Info/MovieInfo.vue";
import MovieCardInfo from "@/components/Info/MovieCardInfo.vue";
import { useMovieStore } from "@/stores/useMovieStore";
import { useResize } from "@/hooks/useResize";

const { movieData } = storeToRefs(useMovieStore());
const container = ref<HTMLElement>();
const { colCount } = useResize(container);

//上方卡片数量
const cardCount = computed(() => (colCount.value <= 3 ? 1 : 2));

//列表卡片数量
const count = computed(() => {
  return (
    Math.floor((movieData.value.length - cardCount.value) / colCount.value) *
      colCount.value +
    cardCount.value
  );
});
</script>

<style scoped lang="scss"></style>
