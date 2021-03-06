import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("./Home.vue"),
  },
  {
    path: "/article",
    component: () => import("./Article/Index.vue"),
  },
  {
    path: "/article/:id",
    component: () => import("./Article/Details.vue"),
  },
  {
    path: "/other",
    component: () => import("./Animation/Index.vue"),
  },
  {
    path: "/music",
    component: () => import("./Music/Index.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/", // 重定向到首页
  },
];

export default routes;
