import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteSSR from "vite-ssr/plugin.js";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import replace from "rollup-plugin-replace";

const { resolve } = require("path");

const IS_DEV = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  resolve: {
    // 配置别名
    alias: {
      "@utils": resolve(__dirname, "src/utils"),
      "@assets": resolve(__dirname, "src/assets"),
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
      "@store": resolve(__dirname, "src/store"),
    },
  },
  build: {
    sourcemap: true, // 开发阶段才用，方便调试
    // minify: false
    // manifest: true,
    // ssrManifest: true
  },
  plugins: [
    replace({
      // 打包的时候用到了 KEY 字段
      "process.env.KEY": JSON.stringify(process.env.KEY),
    }),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    viteSSR({
      build: {
        serverOptions: {
          // 从package.json获取dependencies，到时候发布到服务器上后，也要安装的
          packageJson: {
            dependencies: require("./package.json").dependencies,
          },
        },
      },
    }),
    vue(),
    // 自动引入 vue 等
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "@vueuse/core",
        {
          "@/utils/request": [["default", "request"]],
          moment: [["default", "moment"]],
          // 全局引入Vuex store
          "@/store/index": [["default", "$store"]],
          underscore: [["default", "_"]],
        },
      ],
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
    // TsPluginInject({
    //   modules: {
    //     request: ["@/utils/request", "default"],
    //     moment: ["moment", "default"],
    //   },
    // }),
  ],
  server: {
    // 配置代理
    proxy: {
      "/v1": "http://localhost:9925",
    },
  },
});
