import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory
} from 'vue-router'

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

export default [
  {
    path: '/backend',
    component: () => import('./pages/Backend/Home.vue')
  },
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
  // {
  //   path: '/about',
  //   component: () => import('./pages/About.vue')
  // }
]