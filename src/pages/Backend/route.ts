import { RouteRecordRaw } from "vue-router";
import RouteBridge from "@components/RouteBridge.vue";
import * as type from "@store/mutation-types";

let route: RouteRecordRaw[] = [
  // {
  //   path: "/backend/login",
  //   name: "backendLogin",
  //   component: () => import("./components/Login.vue")
  // },
  {
    path: "/backend",
    component: () => import("./Home.vue"),
    // beforeEnter: async (to, from) => {
    //   console.log(`from ${from.path}, to ${to.path}`)
    //   if (from.path === to.path) return;
    //   const isLogin = computed(() => $store.state.app.isLogin);

    //   console.log(to)

    //   // 进入后台页面，判断用户是否已经登录了
    //   await $store.dispatch(type.CHECK_USER_LOGIN);
    //   // console.log('hahah')
    //   if (isLogin.value) {
    //     // 如果是登录页，跳到后台首页
    //     if (to.path === "/backend/login") {
    //       return { path: "/backend" }
    //     }
    //   } else {
    //     if (to.path !== '/backend/login') {
    //       return {
    //         path: "/backend/login",
    //       }
    //     }
    //   }

    //   // 如果需要登录才可以访问的话，
    //   if (to.meta.requiresAuth) {
    //     console.log("页面需要权限");
    //   }
    // },
    children: [
      {
        path: "",
        name: "backendOverview",
        component: () => import("./components/Overview.vue"),
      },
      {
        path: "test",
        name: "test",
        meta: { title: "test", requiresAuth: true },
        component: () => import("./components/Test.vue"),
      },
      {
        path: "403",
        name: "403",
        component: () => import("./components/403.vue"),
      },
      {
        path: "login",
        name: "backendLogin",
        component: () => import("./components/Empty.vue"),
      },
      {
        path: "article-management",
        name: "article",
        meta: { title: "文章管理", requiresAuth: true },
        component: RouteBridge,
        children: [
          {
            path: "article",
            name: "article",
            meta: { title: "文章列表", requiresAuth: true },
            component: RouteBridge,
            children: [
              {
                path: "",
                name: "articleList",
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
            ]
          }
        ],
      },
      {
        path: "system",
        name: "system",
        meta: { title: "系统管理" },
        component: RouteBridge,
        children: [
          {
            path: "user",
            meta: { title: "用户列表", requiresAuth: true },
            component: RouteBridge,
            children: [
              {
                path: "",
                name: "userList",
                component: () => import("./System/User/List.vue"),
              },
              {
                path: "create",
                name: "userCreate",
                meta: { title: "用户新增" },
                component: () => import("./System/User/Details.vue"),
              },
              {
                path: "edit/:id",
                name: "userEdit",
                meta: { title: "用户编辑" },
                component: () => import("./System/User/Details.vue"),
              },
            ],
          },
          {
            path: "menu",
            name: "menu",
            meta: { title: "菜单配置", requiresAuth: true },
            component: RouteBridge,
            children: [
              {
                path: "",
                name: "menuList",
                component: () => import("./System/Menu/List.vue"),
              },
              {
                path: "create",
                name: "menuCreate",
                meta: { title: "菜单新增" },
                component: () => import("./System/Menu/Details.vue"),
              },
              {
                path: "edit/:id",
                name: "menuEdit",
                meta: { title: "菜单编辑" },
                component: () => import("./System/Menu/Details.vue"),
              },
            ],
          },
          {
            path: "role",
            name: "role",
            meta: { title: "角色配置", requiresAuth: true },
            component: RouteBridge,
            children: [
              {
                path: "",
                name: "roleList",
                component: () => import("./System/Role/List.vue"),
              },
              {
                path: "create",
                name: "roleCreate",
                meta: { title: "角色新增" },
                component: () => import("./System/Role/Details.vue"),
              },
              {
                path: "edit/:id",
                name: "roleEdit",
                meta: { title: "角色编辑" },
                component: () => import("./System/Role/Details.vue"),
              },
            ],
          },
        ]
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
    // redirect: {
    //   name: "articleList",
    // }, // 重定向到后台首页
  }];

export default route;
