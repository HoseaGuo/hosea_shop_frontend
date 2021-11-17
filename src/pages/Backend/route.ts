import { RouteRecordRaw } from 'vue-router'

let route: RouteRecordRaw = {
  path: '/backend',
  component: () => import('./Home.vue'),
  children: [
    {
      path: "article-management/article",
      name: 'article',
      component: () => import('./ArticleManagement/Article.vue'),
    },
    {
      path: "test",
      component: () => import('./ArticleManagement/Test.vue'),
    },
    {
      path: "/:pathMatch(.*)",
      redirect: {
        name: 'article'
      }, // 重定向到后台首页
    }
  ],
  redirect: {
    name: 'article'
  }, // 重定向到后台首页

}

export default route;