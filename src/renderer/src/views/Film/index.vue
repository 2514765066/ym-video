<template>
  <Content @scroll="scrollHandler">
    <header class="pt-8 gap-5 flex">
      <FilmNav to="/film/movie" hover-color="#5a5a5a" title="电影" />

      <FilmNav to="/film/tv" hover-color="#2383e2" title="电视剧" />

      <Search class="ml-auto" />
    </header>

    <RouterView></RouterView>
  </Content>
</template>

<script setup lang="ts">
import Content from "@/components/Content.vue";
import Search from "@/components/Search.vue";
import FilmNav from "@/components/FilmNav.vue";
import { useMovieStore } from "@/stores/useMovieStore";
import { useTvStore } from "@/stores/useTvStore";
import { debounce } from "@/utils/debounce";

const { getMovieData } = useMovieStore();
const { getTvData } = useTvStore();
const route = useRoute();

const isloading = ref(false);

//滚动到底的时候添加内容
const scrollHandler = debounce(async (el?: HTMLDivElement) => {
  if (!el || isloading.value) {
    return;
  }

  const nearBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 200;

  if (!nearBottom) {
    return;
  }

  isloading.value = true;

  switch (route.path) {
    case "/film/movie":
      await getMovieData();
      break;
    case "/film/tv":
      await getTvData();
      break;
  }

  isloading.value = false;
});
</script>

<style scoped lang="scss">
header {
  height: 100px;
}
</style>
