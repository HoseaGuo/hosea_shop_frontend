<script lang="ts">
import { ref, computed } from 'vue'
import { ClientOnly } from "vite-ssr";
import { Menu, Notebook, Expand } from "@element-plus/icons";
import { useRoute } from 'vue-router';
export default {
  components: {
    IconMenu: Menu,
    Notebook,
    Expand,
    ClientOnly
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
            title: "文章",
            index: "article",
          },
        ],
      },
    ];

    let defaultActive = computed(() => $route.path)

    function handleExpand() {
      menuCollapse.value = !menuCollapse.value
    }

    return {
      menuCollapse,
      menus,
      handleExpand,
      defaultActive
    }
  }
}
</script>

<template>
  <ClientOnly>
    <div class="backend-wrapper">
      <header>header</header>
      <div class="body">
        <aside :class="[!menuCollapse ? 'is-open' : '']">
          <div class="menu-control">
            <el-icon :size="20">
              <expand @click="handleExpand" />
            </el-icon>
          </div>
          <el-menu class="backend-menu" :router="true" :collapse="menuCollapse" :default-active="defaultActive">
            <el-sub-menu v-for="(menu, index) in menus" :key="index" :index="menu.index">
              <template #title>
                <el-icon>
                  <notebook />
                </el-icon>
                <span>{{ menu.title }}</span>
              </template>
              <el-menu-item
                v-for="(subMenuItem, subIndex) in menu.children"
                :key="subIndex"
                :index="'/backend/' + subMenuItem.index"
              >
                {{ subMenuItem.title }}
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </aside>
        <div class="main">
          <router-view />
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
      overflow: auto;
      flex: 1;
    }
  }
}
</style>
