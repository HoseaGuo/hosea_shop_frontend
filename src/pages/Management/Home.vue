<script lang="tsx">
import { ClientOnly } from "vite-ssr";
import layout from "./components/Layout.vue";
import login from "./components/Login.vue";
import * as type from "@store/mutation-types";
import { onBeforeRouteUpdate } from "vue-router";
import { ElMessage } from "element-plus";

function checkAuth(to) {
  if (to.meta.requiresAuth) {
    const { authPaths } = $store.state.user;
    const { path } = to;
    const isAuth = authPaths.some(authPath => {
      return path.startsWith(authPath);
    });

    if (!isAuth) {
      ElMessage.warning("没有权限访问该页面");
      return {
        name: "403",
      };
    }
  }
}

export default defineComponent({
  components: {
    layout,
    login,
  },
  beforeRouteEnter: async (to, from) => {
    // console.log(`from ${from.path}, to ${to.path}`);
    if (from.path === to.path) return;

    // 进入后台页面，判断用户是否已经登录了
    await $store.dispatch(type.CHECK_USER_LOGIN);

    const isLogin = $store.state.app.isLogin;

    if (isLogin) {
      // 如果是登录页，跳到后台首页
      if (to.name === "managementLogin") {
        return { name: "managementLogin" };
      }
    } else {
      if (to.name !== "managementLogin") {
        return {
          name: "managementLogin",
        };
      }
    }

    // 如果需要登录才可以访问的话，
    return checkAuth(to);
  },
  setup() {
    const $route = useRoute();
    const $router = useRouter();
    const hasCheckLogin = computed(() => $store.state.app.hasCheckLogin);
    const isLogin = computed(() => $store.state.app.isLogin);

    function watchUserLoginStatus() {
      if (isLogin.value) {
        const { name } = $route;
        // 如果是登录页，跳到后台首页
        if (name === "managementLogin") {
          $router.replace({ path: "/management" });
        }
      } else {
        $router.replace({
          name: "managementLogin",
        });
      }
    }

    // 监听页面登录状态，对路由进行处理
    watch(isLogin, watchUserLoginStatus);

    onBeforeRouteUpdate(checkAuth);

    return () => {
      return (
        <ClientOnly>
          {hasCheckLogin.value ? isLogin.value ? <layout /> : <login /> : null}
        </ClientOnly>
      );
    };
  },
});
</script>
