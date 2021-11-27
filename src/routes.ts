import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'
import backendRoutes from './pages/Backend/route'

// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
// const pages = import.meta.glob('./pages/*.vue')

// const routes = Object.keys(pages).map((path) => {
//   const name = path.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase()
//   return {
//     path: name === '/home' ? '/' : name,
//     component: pages[path] // () => import('./pages/*.vue')
//   }
// })

let routes: RouteRecordRaw[] = [
  // 后台页面
  // backendRoutes,
  {
    path: '/',
    component: () => import('./pages/Frontend/Home.vue')
  },
  {
    path: '/article',
    component: () => import('./pages/Frontend/Article/Index.vue'),
  },
  {
    path: '/article/details',
    component: () => import('./pages/Frontend/Article/Details.vue')
  },
  {
    path: "/:pathMatch(.*)",
    redirect: '/', // 重定向到首页
  }
  // {
  //   path: '/about',
  //   component: () => import('./pages/About.vue')
  // }
]

export default routes;