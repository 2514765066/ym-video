import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home/index.vue";
import Movie from "@/views/Movie/index.vue";
import Tv from "@/views/Tv/index.vue";
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
    },
    {
      path: "/movie",
      component: Movie,
    },
    {
      path: "/tv",
      component: Tv,
    },
    {
      path: "/history",
      component: History,
    },
    {
      path: "/set",
      component: Set,
    },
    {
      path: "/search",
      component: Search,
    },
  ],
});

export default router;
