import { createRouter, createWebHashHistory } from "vue-router";
import VideoView from "@/views/VideoView.vue";
// import VideoSiteView from "@/views/VideoSiteView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "",
      redirect: "/video",
    },
    {
      path: "/video",
      component: VideoView,
    },
    // {
    //   path: "/videosite",
    //   component: VideoSiteView,
    // },
  ],
});

export default router;
