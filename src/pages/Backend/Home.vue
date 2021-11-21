<script lang="ts">
import { ref, computed, onMounted } from "vue";
import { ClientOnly } from "vite-ssr";
import { Menu, Notebook, Expand } from "@element-plus/icons";
import { useRoute } from "vue-router";
export default {
  components: {
    IconMenu: Menu,
    Notebook,
    Expand,
    ClientOnly,
  },
  setup() {
    let $route = useRoute();
    let menuCollapse = ref(false);
    let menus = [
      {
        title: "文章管理",
        index: "article-management",
        children: [
          {
            title: "文章详情",
            index: "article",
          },
          {
            title: "文章列表",
            index: "article-list",
          },
        ],
      },
    ];

    let defaultActive = computed(() => {
      let paths = $route.path
        .split("/")
        .filter((item) => !["backend", ""].includes(item));

      return "/backend/" + paths.slice(0, 3).join("/");
    });

    let breadcrumbs = computed(() => {
      let paths = $route.path
        .split("/")
        .filter((item) => !["backend", ""].includes(item));

      let _breadcrumbs: string[] = [];
      menus.some((menu) => {
        if (paths[0] === menu.index) {
          _breadcrumbs.push(menu.title);
          menu.children.some((childMenu) => {
            if (childMenu.index === paths[1]) {
              _breadcrumbs.push(childMenu.title);
            }
          });
          return true;
        }
      });
      return _breadcrumbs;
    });

    function handleExpand() {
      menuCollapse.value = !menuCollapse.value;
    }

    onMounted(() => {
      // console.log($route);
      // console.log(paths);
    });

    return {
      menuCollapse,
      menus,
      handleExpand,
      defaultActive,
      breadcrumbs,
    };
  },
};
</script>

<template>
  <ClientOnly>
    <div class="backend-wrapper">
      <!-- 公共头部 -->
      <header></header>
      <div class="body">
        <!-- 侧边栏 -->
        <aside :class="[!menuCollapse ? 'is-open' : '']">
          <div class="menu-control">
            <el-icon :size="20">
              <expand @click="handleExpand" />
            </el-icon>
          </div>
          <el-menu
            class="backend-menu"
            :router="true"
            :collapse="menuCollapse"
            :default-active="defaultActive"
          >
            <el-sub-menu
              v-for="(menu, index) in menus"
              :key="index"
              :index="menu.index"
            >
              <template #title>
                <el-icon>
                  <notebook />
                </el-icon>
                <span>{{ menu.title }}</span>
              </template>
              <el-menu-item
                v-for="(subMenuItem, subIndex) in menu.children"
                :key="subIndex"
                :index="`/backend/${menu.index}/${subMenuItem.index}`"
                >{{ subMenuItem.title }}</el-menu-item
              >
            </el-sub-menu>
          </el-menu>
        </aside>
        <!-- 内容 -->
        <div class="main">
          <!-- 面包屑 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in breadcrumbs" :key="item">{{
              item
            }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 内容 路由控制显示 -->
          <div class="main-body">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss">
.backend-wrapper {
  header {
    height: 60px;
    background: #eee;
  }

  .body {
    height: calc(100vh - 60px);
    display: flex;

    aside {
      height: 100%;
      overflow: auto;
      display: flex;
      flex-direction: column;
      transition: 0.5s ease;

      .menu-control {
        height: 50px;
        line-height: 50px;
        text-align: left;
        padding-left: 20px;
        border-right: solid 1px #e6e6e6;

        .el-icon {
          transition: 0.5s ease;
        }
      }

      .backend-menu {
        flex: 1;
        overflow: auto;
        transition: 0.5s ease;
        width: 64px;

        .el-sub-menu .el-menu-item {
          min-width: auto;
        }
      }

      &.is-open {
        .menu-control {
          .el-icon {
            transform: rotate(-180deg);
          }
        }

        .backend-menu {
          width: 200px;
        }
      }
    }

    .main {
      height: 100%;
      flex: 1;
      width: 0;
      display: flex;
      flex-direction: column;

      .el-breadcrumb {
        margin: 0 10px;
        border-bottom: 1px solid #e6e6e6;

        .el-breadcrumb__item {
          height: 30px;
          line-height: 30px;
        }
      }

      .main-body {
        overflow: auto;
        flex: 1;
        padding: 10px;
      }
    }
  }
}
</style>
