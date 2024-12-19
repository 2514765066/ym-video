<template>
  <main class="h">
    <header class="w-100">
      <p class="fs-40">"{{ route.query.keyword }}"的搜索结果</p>
    </header>

    <ElScrollbar class="f-1">
      <ul class="v fw-w g-1r">
        <MovieInfo v-for="item of searchResult" :key="item.id" :data="item" />
      </ul>
    </ElScrollbar>
  </main>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import MovieInfo from "@/components/MovieInfo.vue";
import { MovieInfo as movieInfo } from "@type";
import { useElectron } from "@/hooks/useElectron";

const { search } = useElectron();
const route = useRoute();

//搜索的结果
const searchResult = ref<movieInfo[]>([]);

//当关键词改变的时候重新搜索
watchEffect(async () => {
  searchResult.value = await search(route.query.keyword as string);
});
</script>

<style scoped lang="scss">
main {
  padding-left: 3.5rem;

  > header {
    margin: 12px 0 2rem;

    > p {
      height: 40px;
    }
  }
}
</style>
