import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home/index.vue";
import Recommend from "@/views/Recommend/index.vue";
import Movie from "@/views/Recommend/Movie.vue";
import Tv from "@/views/Recommend/Tv.vue";
import History from "@/views/History/index.vue";
import Search from "@/views/Search/index.vue";
import Set from "@/views/Set/index.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "",
      redirect: "/home",
    },
    {
      path: "/home",
      component: Home,
      meta: {
        title: "主页",
        src: new URL("@/assets/svg/home.svg", import.meta.url),
      },
    },
    {
      path: "/recommend",
      component: Recommend,
      meta: {
        title: "推荐",
        src: new URL("@/assets/svg/tv.svg", import.meta.url),
      },
      children: [
        {
          path: "",
          redirect: "/recommend/movie",
        },
        {
          path: "movie",
          component: Movie,
        },
        {
          path: "tv",
          component: Tv,
        },
      ],
    },
    {
      path: "/history",
      meta: {
        title: "历史",
        src: new URL("@/assets/svg/history.svg", import.meta.url),
      },
      component: History,
    },
    {
      path: "/set",
      meta: {
        title: "设置",
        src: new URL("@/assets/svg/set.svg", import.meta.url),
      },
      component: Set,
    },
    {
      path: "/search",
      component: Search,
    },
  ],
});

export default router;
