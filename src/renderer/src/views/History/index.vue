<template>
  <main class="h">
    <header class="w-100 v-sb-c">
      <p class="fs-40">历史</p>
    </header>

    <ElScrollbar class="f-1" view-class="wh-100">
      <div class="content wh-100">
        <section
          class="v-c-c wh-100"
          style="padding-bottom: 130px"
          v-if="data.length == 0"
        >
          <img
            src="@/assets/image/nothing.png"
            style="filter: brightness(35%)"
          />
        </section>

        <ul class="v fw-w g-1r" v-else>
          <MovieInfo v-for="item of data" :key="item.id" :data="item" />
        </ul>
      </div>
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
  padding-right: 5px;

  > header {
    height: 40px;
    padding: 0 3.4rem;
    margin: 12px 0 2rem;

    > p {
      height: inherit;
    }
  }

  .content {
    padding: 0 3.4rem;
  }
}
</style>
