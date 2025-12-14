import { RouteRecordRaw } from "vue-router";
import Root from "@manager/root.vue";
import Home from "@manager/views/home/index.vue";
import History from "@manager/views/history/index.vue";
import Category from "@manager/views/category/index.vue";
import Search from "@manager/views/search/index.vue";
import Setting from "@manager/views/setting/index.vue";

const route: RouteRecordRaw = {
  path: "/manager",
  component: Root,
  children: [
    {
      path: "",
      redirect: "/manager/home",
    },
    {
      path: "home",
      component: Home,
    },
    {
      path: "category",
      component: Category,
    },
    {
      path: "history",
      component: History,
    },
    {
      path: "search",
      component: Search,
    },
    {
      path: "setting",
      component: Setting,
    },
  ],
};

export default route;
