<script lang="tsx">
import * as type from "@store/mutation-types";
import { buildTree } from "@utils/index";
export default defineComponent({
  setup() {
    const $router = useRouter();
    const formRef = ref<any>(null);
    const treeRef = ref<any>(null);

    const defaultCheckedKeys = ref([]);

    const formData: any = reactive({
      name: "",
      menus: [],
    });

    const $route = useRoute();

    const docId: string = $route.params.id as string;

    const menuList = computed(() => $store.state.menu.menuList);

    // 树数据
    let treeData = computed(() => {
      return buildTree(menuList.value);
    });

    // 是否编辑状态
    let isEdit = computed(() => {
      return Boolean(docId);
    });

    const rules = {
      name: [
        {
          required: true,
          message: "请输入角色名",
          trigger: "blur",
        },
      ],
    };

    async function handleSave() {
      let checkedKeys = treeRef.value.getCheckedKeys();
      // let halfCheckedKeys = treeRef.value.getHalfCheckedKeys();

      formData.menus = [...checkedKeys]!;

      formRef.value
        .validate()
        .then(async isPass => {
          const result = await request({
            url: "/role",
            method: isEdit.value ? "put" : "post",
            data: formData,
            showSuccessMsg: true,
          });
          if (result.success) {
            $router.replace({
              name: "roleList",
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    async function queryDocById() {
      let result = await request({
        url: "/role",
        data: {
          _id: docId,
        },
      });
      if (result.success) {
        Object.assign(formData, _.pick(result.data, ["_id", "name", "menus"]));
        defaultCheckedKeys.value = formData.menus;
      }
    }

    onMounted(() => {
      // 获取目录数据
      if (menuList.value.length === 0) {
        $store.dispatch(type.GET_MENU_LIST);
      }

      // 如果是编辑状态，则查询
      if (isEdit.value) {
        queryDocById();
      }
    });

    return () => (
      <div class="public-form">
        <el-form size="mini" model={formData} ref={formRef} rules={rules} label-width="6em">
          <el-form-item label="角色名" prop="name">
            <el-input type="text" v-model={formData.name} autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="可访问目录" prop="password">
            <el-tree
              ref={treeRef}
              check-strictly
              default-checked-keys={defaultCheckedKeys.value}
              expand-on-click-node={false}
              show-checkbox={true}
              props={{ label: "name" }}
              default-expand-all={true}
              data={treeData.value}
              node-key="_id"
            />
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
