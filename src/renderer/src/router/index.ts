import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home/index.vue";
import Film from "@/views/Film/index.vue";
import Movie from "@/views/Film/Movie/index.vue";
import Tv from "@/views/Film/Tv/index.vue";
import Search from "@/views/Search/index.vue";
import Play from "@/views/Play/index.vue";

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
      path: "/film",
      component: Film,
      children: [
        {
          path: "",
          redirect: "/film/movie",
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
      path: "/play",
      component: Play,
    },
    {
      path: "/search",
      component: Search,
    },
  ],
});

export default router;
