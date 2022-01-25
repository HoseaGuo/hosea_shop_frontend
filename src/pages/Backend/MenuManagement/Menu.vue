<script lang="tsx">
export default defineComponent({
  setup() {
    const $router = useRouter();
    const formRef = ref<any>(null);
    const formData = reactive({
      name: "",
      path: "",
    });
    const rules = {
      username: [
        {
          required: true,
          message: "请输入目录名称",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入目录路径",
          trigger: "blur",
        },
      ],
    };

    async function handleSave() {
      formRef.value
        .validate()
        .then(async isPass => {
          const result = await request({
            url: "/menu",
            method: "post",
            data: formData,
            showSuccessMsg: true,
          });
          if (result.success) {
            $router.replace({
              name: "menuList",
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
          <el-form-item label="目录名称" prop="name">
            <el-input type="text" v-model={formData.name} autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="目录路径" prop="path">
            <el-input type="text" v-model={formData.path} autocomplete="off"></el-input>
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
