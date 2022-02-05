<script lang="tsx">
export default defineComponent({
  setup() {
    const $router = useRouter();
    const formRef = ref<any>(null);

    const roleOptions = ref<any>([]);

    const formData = reactive({
      username: "",
      password: "",
      roles: [],
    });

    const $route = useRoute();

    const docId: string = $route.params.id as string;

    // 是否编辑状态
    let isEdit = computed(() => {
      return Boolean(docId);
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
          required: !isEdit.value,
          message: `请输入密码`,
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
            method: isEdit.value ? "put" : "post",
            data: formData,
            showSuccessMsg: true,
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

    async function queryDocById() {
      let result = await request({
        url: "/user",
        data: {
          _id: docId,
        },
      });
      if (result.success) {
        Object.assign(formData, _.pick(result.data, ["_id", "username", "roles"]));
      }
    }

    // 获取角色数据
    async function getRoleData() {
      const result = await request({
        url: "/role",
        data: {
          pageSize: 1000
        }
      });
      if (result.success) {
        result.data.list.forEach(item => {
          roleOptions.value.push({
            label: item.name,
            value: item._id,
          });
        });
      }
    }

    onMounted(async () => {
      await getRoleData();
      // 如果是编辑状态，则查询
      if (isEdit.value) {
        queryDocById();
      }
    });

    return () => (
      <div class="public-form">
        <el-form size="mini" model={formData} ref={formRef} rules={rules} label-width="6em">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model={formData.username} autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label={`${isEdit.value ? "新" : ""}密码`} prop="password">
            <el-input type="password" v-model={formData.password} autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model={formData.roles} multiple>
              {roleOptions.value.map(role => (
                <el-option label={role.label} value={role.value} />
              ))}
            </el-select>
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
