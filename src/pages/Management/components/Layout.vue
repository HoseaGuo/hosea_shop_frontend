<script lang="tsx">
import { Notebook, Expand, ArrowRight, HomeFilled } from "@element-plus/icons";
import { useRoute } from "vue-router";
import * as type from "@store/mutation-types";

export default {
  components: {
    Notebook,
    Expand,
    HomeFilled,
  },
  setup() {
    const $route = useRoute();
    const $router = useRouter();
    const menuCollapse = ref(false);
    const userInfo = computed(() => $store.state.user.info);
    const menuTreeData = computed(() => $store.state.user.menuTreeData);

    const isLogin = computed(() => $store.state.app.isLogin);
    const menus = [
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
      {
        title: "系统管理",
        index: "system",
        children: [
          {
            title: "用户列表",
            index: "user",
          },
          {
            title: "菜单配置",
            index: "menu",
          },
          {
            title: "角色配置",
            index: "role",
          },
        ],
      },
    ];

    // 当前激活的目录
    const defaultActive = computed(() => {
      const paths = $route.path.split("/").filter(item => !["management", ""].includes(item));

      const activeStr = "/management/" + paths.slice(0, 2).join("/");
      return activeStr;
    });

    // 面包屑
    const breadcrumbs: any = computed(() => {
      let { matched } = $route;

      const _breadcrumbs: {
        title: string;
        path?: string;
      }[] = [];

      matched = matched.filter(item => item.meta.title);

      matched.forEach(item => {
        _breadcrumbs.push({
          title: item.meta.title as string,
          path: item.path,
        });
      });

      _breadcrumbs[0] && (_breadcrumbs[0].path = "");

      return _breadcrumbs;
    });

    function handleExpand() {
      menuCollapse.value = !menuCollapse.value;
    }

    function logout() {
      $store.dispatch(type.USER_LOGOUT);
    }

    const slots = {
      dropdown: () => (
        <el-dropdown-menu>
          <el-dropdown-item onClick={logout}>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      ),
    };

    // 渲染目录
    function renderMenuItem(menus) {
      return menus.map((menu, index) => {
        return menu.children ? (
          <el-sub-menu
            key={menu.path}
            index={menu.path}
            v-slots={{
              title: () => (
                <>
                  <el-icon>
                    <notebook />
                  </el-icon>
                  <span>{menu.name}</span>
                </>
              ),
            }}
          >
            {renderMenuItem(menu.children)}
          </el-sub-menu>
        ) : (
          <el-menu-item
            key={index}
            index={menu.path}
            v-slots={{
              title: () => (
                <>
                  <el-icon>
                    <notebook />
                  </el-icon>
                  <span>{menu.name}</span>
                </>
              ),
            }}
          ></el-menu-item>
        );
      });
    }

    return () => {
      return (
        <div class="management-wrapper">
          {/** 头部 */}
          <header class="wing-blank">
            <div class="left">
              <router-link to="/">
                <el-icon size="20">
                  <HomeFilled />
                </el-icon>
                <span>首页</span>
              </router-link>
            </div>
            <div>
              欢迎：
              <el-dropdown v-slots={slots}>
                <span class="username">{userInfo.value.username}</span>
              </el-dropdown>
            </div>
          </header>
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
                class="management-menu"
                router
                collapse={menuCollapse.value}
                default-active={defaultActive.value}
              >
                {renderMenuItem(menuTreeData.value)}
              </el-menu>
            </aside>
            <div class="main">
              {/** 面包屑 */}
              <el-breadcrumb
                v-show={!["/management/403", "/management"].includes($route.path)}
                separator-icon={ArrowRight}
              >
                {breadcrumbs.value.map((item, index) => {
                  return (
                    <el-breadcrumb-item key={index} to={item.path}>
                      {item.title}
                    </el-breadcrumb-item>
                  );
                })}
              </el-breadcrumb>
              {/* 主体内容 */}
              <div class="main-body">
                <router-view />
              </div>
            </div>
          </div>
        </div>
      );
    };
  },
};
</script>

<style lang="scss">
.management-wrapper {
  header {
    height: 60px;
    background: #eee;
    display: flex;
    align-items: center;
    .left {
      flex: 1;
      a {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        text-decoration: none;
        color: #666;
        i {
          vertical-align: middle;
        }
        span {
          margin-left: 6px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    .username {
      font-weight: bold;
      color: #2cb9ef;
    }
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

      .management-menu {
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

        .management-menu {
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
