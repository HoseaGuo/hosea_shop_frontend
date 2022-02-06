<script lang="tsx">
import { ClientOnly } from "vite-ssr";
import { useHead } from "@vueuse/head";
import * as type from "@store/mutation-types";
import logo from "@assets/logo-h-300.png";

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    console.log("login before route enter");
    next();
    // ...
  },
  setup() {
    let title = "后台登录 - Hosea爱生活";
    const isTest = process.env.KEY === 'test';
    const formRef = ref<any>(null);
    const isLogin = computed(() => $store.state.app.isLogin);

    let formData = reactive({
      username: "",
      password: "",
    });

    if (isTest) {
      formData.username = "test";
      formData.password = "123456";
    }

    const rules = {
      username: [
        {
          required: true,
          message: "用户名不能为空",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "密码不能为空",
          trigger: "blur",
        },
      ],
    };

    async function handleSubmit() {
      const form = unref(formRef);
      if (form) {
        form.validate(valid => {
          if (valid) {
            $store.dispatch(type.USER_LOGIN, formData);
          } else {
            return false;
          }
        });
      }
    }

    function handleReset() {
      formRef.value.resetFields();
    }

    return () => (
      <div class="login-wrapper">
        <div class="inner wing-blank">
          <img class="logo" src={logo} />
          <el-form model={formData} ref={formRef} rules={rules} size="mini">
            <el-form-item prop="username">
              <el-input type="text" placeholder="请输入账号" v-model={formData.username} autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="请输入密码" v-model={formData.password} autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right;">
              <el-button type="primary" onClick={handleSubmit}>
                登录
              </el-button>
              <el-button onClick={handleReset}>重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    );
  },
});
</script>

<style lang="scss">
.login-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  .inner {
    width: 100%;
    max-width: 350px;
    margin: auto;
    .logo {
      display: block;
      margin: 0 auto 30px;
      width: 120px;
      height: 120px;
    }
    h1 {
      text-align: center;
      font-size: 18px;
      margin-bottom: 26px;
      color: #333;
    }
  }
}
</style>
