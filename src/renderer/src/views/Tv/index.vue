<template>
  <main class="h">
    <header class="w-100 v g-2r">
      <p class="fs-40">推荐电视剧</p>
    </header>

    <ElScrollbar class="f-1">
      <div class="content">
        <ul class="v fw-w g-1r">
          <MovieInfo v-for="item of tvDataShow" :key="item.name" :data="item" />
        </ul>

        <section class="v-c-c more" v-if="tvDataShow.length != 0">
          <img
            src="@/assets/svg/loading.svg"
            class="loading"
            width="35px"
            v-if="loading"
          />
          <button class="button1" @click="handleClick" v-else>查看更多</button>
        </section>
      </div>
    </ElScrollbar>
  </main>
</template>

<script setup lang="ts">
import MovieInfo from "@/components/MovieInfo.vue";
import { ElScrollbar } from "element-plus";
import { useMovieStore } from "@/stores/useMovieStore";

const { tvDataShow } = storeToRefs(useMovieStore());
const { getMovieData, getTvData } = useMovieStore();
const route = useRoute();

defineOptions({
  name: "Tv",
});

//是否在加载
const loading = ref(false);

//处理点击
const handleClick = async () => {
  loading.value = true;

  if (route.path == "/recommend/movie") {
    await getMovieData();
  } else {
    await getTvData();
  }

  loading.value = false;
};
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

    > a {
      transition: 0.1s;

      &:hover {
        color: #cdced1;
      }

      &::before {
        content: "";
        width: 20px;
        height: 3.5px;
        display: block;
        position: absolute;
        bottom: 8px;
        border-radius: 3.5px;
        transition: 0.1s background-color;
      }
    }

    .active {
      &::before {
        background-color: #ff8232;
      }
    }
  }

  .content {
    padding: 0 3.4rem;

    .more {
      height: 100px;
    }
  }
}
</style>
