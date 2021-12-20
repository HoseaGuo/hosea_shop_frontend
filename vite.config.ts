import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteSSR from "vite-ssr/plugin.js";
import vueJsx from "@vitejs/plugin-vue-jsx";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import MyUnplugin from "./unplugin/MyUnplugin";
import TsPluginInject from "./unplugin/TsPluginInject";

const { resolve } = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 配置别名
    alias: {
      "@utils": resolve(__dirname, "src/utils"),
      "@assets": resolve(__dirname, "src/assets"),
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
    },
  },
  plugins: [
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    viteSSR(),
    vue(),
    // 自动引入 vue 等
    AutoImport({
      imports: ["vue"], // '@vueuse/core'
      resolvers: [
        ElementPlusResolver({
          ssr: true,
        }),
      ],
    }),
    // 自动引入组件
    Components({
      dts: true,
      resolvers: [
        ElementPlusResolver({
          ssr: true,
          importStyle: false,
        }),
      ],
    }),
    TsPluginInject({
      modules: {
        request: ["@/utils/request", "default"],
      },
    }),
  ],
  server: {
    // 配置代理
    proxy: {
      "/v1": "http://localhost:9925",
    },
  },
});
