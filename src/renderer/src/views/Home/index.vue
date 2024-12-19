<template>
  <main class="h">
    <header>
      <p class="fs-40">主页</p>
    </header>

    <ElScrollbar class="f-1">
      <section class="mb-2r module" v-if="historyData.length != 0">
        <p class="fs-22 mb-4">历史</p>

        <ul class="v fw-w g-1r">
          <MovieInfo v-for="item of historyData" :key="item.id" :data="item" />
        </ul>
      </section>

      <section class="mb-2r module" v-if="movieData.length != 0">
        <header class="v-n-c mb-4 g-1r">
          <p class="fs-22">推荐电影</p>

          <RouterLink to="/recommend/movie" class="more">更多></RouterLink>
        </header>

        <ul class="v fw-w g-1r">
          <MovieInfo v-for="item of movieData" :key="item.id" :data="item" />
        </ul>
      </section>

      <section class="mb-2r module" v-if="tvData.length != 0">
        <header class="v-n-c mb-4 g-1r">
          <p class="fs-22">推荐电视剧</p>

          <RouterLink to="/recommend/tv" class="more">更多></RouterLink>
        </header>

        <ul class="v fw-w g-1r">
          <MovieInfo v-for="item of tvData" :key="item.id" :data="item" />
        </ul>
      </section>
    </ElScrollbar>
  </main>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import MovieInfo from "@/components/MovieInfo.vue";
import { useVideoStore } from "@/stores/useVideoStore";
import { useMovieStore } from "@/stores/useMovieStore";

const videoStore = useVideoStore();
const movieStore = useMovieStore();

defineOptions({
  name: "Home",
});

//历史记录数量
const maxCount = ref(5);

//历史记录
const historyData = computed(() => {
  return videoStore.data.slice(0, maxCount.value);
});

//推荐电影
const movieData = computed(() => {
  return movieStore.movieData.slice(0, maxCount.value);
});

//推荐电视剧
const tvData = computed(() => {
  return movieStore.tvData.slice(0, maxCount.value);
});

onMounted(() => {
  window.addEventListener("resize", () => {
    const count = Math.floor((window.innerWidth - 320) / (140 + 16));

    if (count == maxCount.value) {
      return;
    }

    maxCount.value = count;
  });
});
</script>

<style scoped lang="scss">
main {
  padding-left: 3.5rem;
  padding-right: 5px;

  > header {
    margin: 12px 0 2rem;

    > p {
      height: 40px;
    }
  }

  .more {
    color: #fff;
    font-size: 14px;
    transition: 0.1s color;

    &:hover {
      color: #ff8232;
    }
  }
}
</style>
