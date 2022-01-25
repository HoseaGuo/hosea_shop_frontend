<script lang="tsx">
import { ClientOnly } from "vite-ssr";
import layout from "./components/Layout.vue";
import * as type from "@store/mutation-types";

export default {
  components: {
    layout,
  },
  setup() {
    const $route = useRoute();
    const $router = useRouter();
    const hasCheckLogin = computed(() => $store.state.app.hasCheckLogin);
    const isLogin = computed(() => $store.state.app.isLogin);

    function watchUserLoginStatus() {
      if (isLogin.value) {
        const { path } = $route;
        // 如果是登录页，跳到后台首页
        if (path === "/backend/login") {
          $router.replace({ path: "/backend" });
        }
      } else {
        $router.replace({
          name: "backendLogin",
        });
      }
    }

    // 检查判断登录已经进行，对路由进行一些处理
    watchOnce(hasCheckLogin, () => {
      watchUserLoginStatus();
      watch(isLogin, watchUserLoginStatus);
    });

    // 进入后台页面，判断用户是否已经登录了
    $store.dispatch(type.CHECK_USER_LOGIN);

    return () => {
      return <ClientOnly>{hasCheckLogin.value ? <layout /> : null}</ClientOnly>;
    };
  },
};
</script>
