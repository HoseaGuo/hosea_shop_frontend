// import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes'
import viteSSR from 'vite-ssr'
// elementui引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "../styles/reset.scss"

import hljs from "highlight.js"; // 引入 highlight.js

// 忽略highlight的unescapedHTML警告
hljs.configure({ ignoreUnescapedHTML: true })

export default viteSSR(App, { routes }, async ({ app, router }) => {
  /* Vite SSR main hook for custom logic */
  /* const { app, router, initialState, ... } = context */
  // router.beforeEach(async (to, from) => {

  //   console.log(to)

  //   console.log(import.meta.env.SSR)


  //   /* if (to.meta.state) {
  //     return // Already has state
  //   }

  //   const response = await fetch('my/api/data/' + to.name)

  //   // This will modify initialState
  //   to.meta.state = await response.json() */
  // })

  // #在main.js定义自定义指令 
  app.directive('highlight', function (el) {
    // console.log(el.innerHTML)
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
      hljs.highlightElement(block);
    })
    // hljs.highlightElement(el)
  })
  app.use(ElementPlus);
})
