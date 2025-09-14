<template>
  <Content @scroll="scrollHandler">
    <header class="pt-8 gap-5 flex">
      <FilmNav to="/film/movie" hover-color="#5a5a5a" title="电影" />

      <FilmNav to="/film/tv" hover-color="#2383e2" title="电视剧" />
    </header>

    <RouterView></RouterView>
  </Content>
</template>

<script setup lang="ts">
import Content from "@/components/Content.vue";
import FilmNav from "@/components/FilmNav.vue";
import { useMovieStore } from "@/stores/useMovieStore";
import { useTvStore } from "@/stores/useTvStore";
import { debounce } from "@/utils/debounce";

const { getMovieData } = useMovieStore();
const { getTvData } = useTvStore();
const route = useRoute();

//是否加载资源
let loadData = false;

//滚动到底的时候添加内容
const scrollHandler = debounce(async (el?: HTMLDivElement) => {
  if (!el || loadData) {
    return;
  }

  const nearBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 200;

  if (!nearBottom) {
    return;
  }

  loadData = true;

  switch (route.path) {
    case "/film/movie":
      await getMovieData();
      break;
    case "/film/tv":
      await getTvData();
      break;
  }

  loadData = false;
});
</script>

<style scoped lang="scss">
header {
  height: 100px;
}
</style>
