import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";
import backendRoutes from "./pages/Backend/route";
import frontendRoutes from "./pages/Frontend/route";

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
  // 前端页面
  ...frontendRoutes,
  // 后台页面
  ...backendRoutes,
];

export default routes;
