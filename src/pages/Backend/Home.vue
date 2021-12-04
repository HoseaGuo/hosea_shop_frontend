<script lang="tsx">
import { ref, computed, onMounted } from "vue";
import { ClientOnly } from "vite-ssr";
import { Menu, Notebook, Expand, ArrowRight } from "@element-plus/icons";
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
            title: "文章列表",
            index: "article",
          },
        ],
      },
    ];

    let defaultActive = computed(() => {
      let paths = $route.path
        .split("/")
        .filter((item) => !["backend", ""].includes(item));

      let activeStr = "/backend/" + paths.slice(0, 2).join("/");
      return activeStr;
    });

    // 面包屑
    let breadcrumbs: any = computed(() => {
      let { matched } = $route;
      let _breadcrumbs: {
        title: string;
        path?: string;
      }[] = [];

      // 一级目录
      let levelOneMatch: any = matched[1];
      _breadcrumbs.push({
        title: levelOneMatch.meta.title as string,
        path: "/backend/article-management/article",
      });

      if (levelOneMatch.children[0]) {
        // 二级目录
        let levelTwoMatchItem = {
          title: levelOneMatch.children[0].meta.title as string,
          path: levelOneMatch.path,
        };
        _breadcrumbs.push(levelTwoMatchItem);

        // 或者会有三级目录
        let levelThreeMatch = matched[matched.length - 1];
        if (levelThreeMatch.path !== levelTwoMatchItem.path) {
          _breadcrumbs.push({
            title: levelThreeMatch.meta.title as string,
            path: levelThreeMatch.path,
          });
        }
      }

      return _breadcrumbs;
    });

    function handleExpand() {
      menuCollapse.value = !menuCollapse.value;
    }

    return () => {
      return (
        <ClientOnly>
          <div class="backend-wrapper">
            {/** 头部 */}
            <header></header>
            {/** body */}
            <div class="body">
              {/** 侧边栏 */}
              <aside class={[!menuCollapse.value ? "is-open" : ""]}>
                <div class="menu-control">
                  <el-icon size={20}>
                    <expand onclick={handleExpand} />
                  </el-icon>
                </div>
                {/** 目录 */}
                <el-menu
                  class="backend-menu"
                  router
                  collapse={menuCollapse.value}
                  default-active={defaultActive.value}
                >
                  {menus.map((menu, index) => {
                    return (
                      <el-sub-menu
                        key={index}
                        index={menu.index}
                        v-slots={{
                          title: () => (
                            <>
                              <el-icon>
                                <notebook />
                              </el-icon>
                              <span>{menu.title}</span>
                            </>
                          ),
                        }}
                      >
                        {menu.children.map((subMenuItem, subIndex) => {
                          return (
                            <el-menu-item
                              key={subIndex}
                              index={`/backend/${menu.index}/${subMenuItem.index}`}
                            >
                              {subMenuItem.title}
                            </el-menu-item>
                          );
                        })}
                      </el-sub-menu>
                    );
                  })}
                </el-menu>
              </aside>
              <div class="main">
                {/** 面包屑 */}
                <el-breadcrumb separator-icon={ArrowRight}>
                  {breadcrumbs.value.map((item, index) => {
                    return (
                      <el-breadcrumb-item key={index} to={item.path}>
                        {item.title}
                      </el-breadcrumb-item>
                    );
                  })}
                </el-breadcrumb>
                <div class="main-body">
                  <router-view />
                </div>
              </div>
            </div>
          </div>
        </ClientOnly>
      );
    };
  },
};
</script>

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
