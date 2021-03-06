// import { createApp } from 'vue'
import App from "./App.vue";
import routes from "./routes";
import viteSSR from "vite-ssr";
import $store from './store'
// 样式
import "./styles/reset.scss";
import "./styles/public.scss";
// elementui引入
// import ElementPlus from 'element-plus'
import "element-plus/dist/index.css";

import { createHead } from "@vueuse/head";
import hljs from "highlight.js"; // 引入 highlight.js

// 忽略highlight的unescapedHTML警告
hljs.configure({ ignoreUnescapedHTML: true });

export default viteSSR(App, { routes }, async ({ app, router }) => {
  /* Vite SSR main hook for custom logic */
  /* const { app, router, initialState, ... } = context */
  router.beforeEach(async (to, from) => {

    // console.log(to)

    // 如果需要登录才可以访问的话，
    // if (to.meta.requiresAuth) {
    //   console.log("页面需要权限");
    // }

    /* if (to.meta.state) {
      return // Already has state
    }

    const response = await fetch('my/api/data/' + to.name)

    // This will modify initialState
    to.meta.state = await response.json() */
  })

  // #在main.js定义自定义指令
  app.directive("highlight", function (el) {
    // console.log(el.innerHTML)
    let blocks = el.querySelectorAll("pre code");
    blocks.forEach((block) => {
      hljs.highlightElement(block);
    });
    // hljs.highlightElement(el)
  });

  // 将 store 实例作为插件安装
  app.use($store);

  // app.use(ElementPlus);

  /* 使用 添加 head tags and attributes */
  const head = createHead();
  app.use(head);
  return { head };
});
