<script lang="tsx">
export default defineComponent({
  setup() {
    const $router = useRouter();
    const formRef = ref<any>(null);
    const formData = reactive({
      username: "",
      password: "",
    });
    const rules = {
      username: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
      ],
    };

    async function handleSave() {
      formRef.value
        .validate()
        .then(async isPass => {
          const result = await request({
            url: "/user",
            method: "post",
            data: formData,
          });
          if (result.success) {
            $router.replace({
              name: "userList",
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    return () => (
      <div class="public-form">
        <el-form size="mini" model={formData} ref={formRef} rules={rules} label-width="6em">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model={formData.username} autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model={formData.password} autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" onClick={handleSave}>
              保存
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    );
  },
});
</script>
