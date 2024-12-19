<template>
  <main class="h">
    <header class="w-100 v-sb-c">
      <p class="fs-40">历史</p>
    </header>

    <ElScrollbar class="f-1">
      <ul class="v fw-w g-1r">
        <MovieInfo v-for="item of data" :key="item.id" :data="item" />
      </ul>
    </ElScrollbar>
  </main>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import MovieInfo from "@/components/MovieInfo.vue";
import { useVideoStore } from "@/stores/useVideoStore";

const { data } = storeToRefs(useVideoStore());
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
}
</style>
