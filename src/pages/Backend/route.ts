import { RouteRecordRaw } from "vue-router";
import RouteBridge from "@components/RouteBridge.vue";

let route: RouteRecordRaw = {
  path: "/backend",
  component: () => import("./Home.vue"),
  children: [
    {
      path: "article-management/article",
      name: "article",
      meta: { title: "文章管理" },
      component: RouteBridge,
      children: [
        {
          path: "",
          name: "article-list",
          meta: { title: "文章列表" },
          component: () => import("./ArticleManagement/ArticleList.vue"),
        },
        {
          path: "details",
          name: "articleCreate",
          meta: { title: "文章新增" },
          component: () => import("./ArticleManagement/Article.vue"),
        },
        {
          path: "details/:id",
          name: "articleEdit",
          meta: { title: "文章编辑" },
          component: () => import("./ArticleManagement/Article.vue"),
        },
      ],
    },
    // {
    //   path: "article-management/test",
    //   name: "test",
    //   component: () => import('./ArticleManagement/Test'),
    // },
    {
      path: "/:pathMatch(.*)",
      redirect: {
        name: "article",
      }, // 重定向到后台首页
    },
  ],
  redirect: {
    name: "article",
  }, // 重定向到后台首页
};

export default route;
