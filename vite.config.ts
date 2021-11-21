import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import viteSSR from 'vite-ssr/plugin.js'
const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 配置别名
    alias: {
      '@utils': resolve(__dirname, 'src/utils')
    }
  },
  plugins: [
    viteSSR(),
    vue()
  ],
  server: {
    // 配置代理
    proxy: {
      "/v1": "http://localhost:9925"
    }
  }
})
