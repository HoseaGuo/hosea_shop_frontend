import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue';
import viteSSR from 'vite-ssr/plugin.js'
import vueJsx from '@vitejs/plugin-vue-jsx';
const { resolve } = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 配置别名
    alias: {
      '@utils': resolve(__dirname, 'src/utils')
    }
  },
  plugins: [
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    viteSSR(),
    // vue()
  ],
  server: {
    // 配置代理
    proxy: {
      "/v1": "http://localhost:9925"
    }
  }
})
