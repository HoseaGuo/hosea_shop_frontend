import { RouteRecordRaw } from "vue-router";
import RouteBridge from "@components/RouteBridge.vue";

let route: RouteRecordRaw[] = [
  {
    path: "/backend",
    component: () => import("./Home.vue"),
    children: [
      {
        path: "login",
        name: "backendLogin",
        component: () => import("./components/Empty.vue"),
      },
      {
        path: "article-management/article",
        name: "article",
        meta: { title: "文章管理" },
        component: RouteBridge,
        children: [
          {
            path: "",
            name: "articleList",
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
      {
        path: "user-management/user",
        name: "user",
        meta: { title: "用户管理" },
        component: RouteBridge,
        children: [
          {
            path: "",
            name: "userList",
            meta: { title: "用户列表" },
            component: () => import("./UserManagement/UserList.vue"),
          },
          {
            path: "details",
            name: "userCreate",
            meta: { title: "用户新增" },
            component: () => import("./UserManagement/User.vue"),
          },
          {
            path: "details/:id",
            name: "userEdit",
            meta: { title: "用户编辑" },
            component: () => import("./UserManagement/User.vue"),
          },
        ],
      },
      {
        path: "menu-management/menu",
        name: "menu",
        meta: { title: "目录管理" },
        component: RouteBridge,
        children: [
          {
            path: "",
            name: "menuList",
            meta: { title: "目录列表" },
            component: () => import("./MenuManagement/MenuList.vue"),
          },
          {
            path: "details",
            name: "menuCreate",
            meta: { title: "目录新增" },
            component: () => import("./MenuManagement/Menu.vue"),
          },
          {
            path: "details/:id",
            name: "menuEdit",
            meta: { title: "目录编辑" },
            component: () => import("./MenuManagement/Menu.vue"),
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
          name: "articleList",
        }, // 重定向到后台首页
      },
    ],
    redirect: {
      name: "articleList",
    }, // 重定向到后台首页
  }];

export default route;
