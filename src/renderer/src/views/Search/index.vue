<template>
  <Content>
    <header class="pt-8 gap-5 flex">
      <span class="text-3xl text-color font-bold">
        "{{ keyword }}"的所有搜索结果
      </span>
    </header>

    <ul class="gap-4 h-fit grid grid-list">
      <MovieInfo
        v-for="(item, index) of searchData"
        :key="item.name"
        v-model="searchData[index]"
      />
    </ul>
  </Content>
</template>

<script setup lang="ts">
import Content from "@/components/Content/index.vue";
import MovieInfo from "@/components/Info/MovieInfo.vue";
import { useSearchStore } from "@/stores/useSearchStore";

const { searchData, keyword } = storeToRefs(useSearchStore());
</script>

<style scoped lang="scss">
header {
  height: 100px;
}
</style>
