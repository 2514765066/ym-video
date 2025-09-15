<template>
  <Loading v-if="state == 'loading'" />

  <Content v-else>
    <header class="pt-8 gap-5 flex">
      <span class="text-3xl text-main font-bold">
        "{{ copyKeyword }}"的所有搜索结果
      </span>
    </header>

    <ul class="gap-4 h-fit grid grid-list">
      <MovieCard
        v-for="(item, index) of copySearchData"
        :key="item.name"
        v-model="searchData[index]"
      />
    </ul>

    <Empty v-if="state == 'empty'" />
  </Content>
</template>

<script setup lang="ts">
import Empty from "@/components/Empty.vue";
import Content from "@/components/Content.vue";
import MovieCard from "@/components/Card/MovieCard.vue";
import Loading from "@/components/Loading/Loading.vue";
import { useSearchStore } from "@/stores/useSearchStore";
import { SearchInfo } from "@type";

const { searchData, keyword, state } = storeToRefs(useSearchStore());

const copyKeyword = ref("");

const copySearchData = ref<SearchInfo[]>([]);

watch(
  searchData,
  () => {
    copyKeyword.value = keyword.value;

    copySearchData.value = searchData.value;
  },
  {
    immediate: true,
  }
);
</script>

<style scoped lang="scss">
header {
  height: 100px;
}
</style>
