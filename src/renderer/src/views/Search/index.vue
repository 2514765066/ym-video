<template>
  <main class="h">
    <header class="w-100">
      <p class="fs-40">"{{ route.query.keyword }}"的搜索结果</p>
    </header>

    <ElScrollbar class="f-1" view-class="wh-100">
      <div class="content wh-100">
        <section
          class="v-c-c wh-100"
          style="padding-bottom: 130px"
          v-if="status == '404' || status == '403'"
        >
          <img
            src="@/assets/image/nothing.png"
            style="filter: brightness(35%)"
          />
        </section>

        <ul class="v fw-w g-1r" v-else>
          <MovieInfo v-for="item of searchResult" :key="item.id" :data="item" />
        </ul>
      </div>
    </ElScrollbar>
  </main>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import MovieInfo from "@/components/MovieInfo.vue";
import { MovieInfo as movieInfo } from "@type";

const route = useRoute();

//搜索状态
const status = ref("");

//搜索的结果
const searchResult = ref<movieInfo[]>([]);

//当关键词改变的时候重新搜索
watchEffect(async () => {
  searchResult.value = await api.search(route.query.keyword as string);
});
</script>

<style scoped lang="scss">
main {
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
