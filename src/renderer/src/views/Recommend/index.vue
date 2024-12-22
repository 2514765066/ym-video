<template>
  <main class="h">
    <header class="w-100 v g-2r">
      <p class="fs-40">推荐</p>

      <RouterLink
        class="fs-18 c-fff p-r v-c-n"
        v-for="{ to, title } of nav"
        :key="title"
        :to="to"
        :class="{ active: route.path == to }"
      >
        {{ title }}
      </RouterLink>
    </header>

    <ElScrollbar class="f-1">
      <div class="content">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>

        <section class="v-c-c more" v-if="movieData.length != 0">
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
import { ElScrollbar } from "element-plus";
import { useMovieStore } from "@/stores/useMovieStore";

const { movieData } = storeToRefs(useMovieStore());
const { getMovieData, getTvData } = useMovieStore();
const route = useRoute();

defineOptions({
  name: "Recommend",
});

const nav = [
  {
    title: "推荐电影",
    to: "/recommend/movie",
  },
  {
    title: "推荐电视剧",
    to: "/recommend/tv",
  },
];

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
