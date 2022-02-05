<script lang="tsx">
import * as type from "@store/mutation-types";
export default defineComponent({
  setup() {
    const $router = useRouter();
    const formRef = ref<any>(null);

    const $route = useRoute();

    // 目录id
    const docId: string = $route.params.id as string;

    // 是否编辑状态
    let isEdit = computed(() => {
      return Boolean(docId);
    });

    let formData = reactive({
      name: "",
      path: "",
      index: 0,
      parentId: "0",
    });

    const menuList = computed(() => $store.state.menu.menuList);

    const parentIdOptions = computed(() => {
      const menuList = $store.state.menu.menuList;
      let options = [
        {
          label: "无",
          value: "0",
        },
      ];
      // 取根目录
      menuList.forEach(menu => {
        // 所有一级目录，并且目录的_id不能和本身相同
        if (menu.parentId === "0" && menu._id !== docId) options.push({ label: menu.name, value: menu._id });
      });
      return options;
    });

    const rules = {
      name: [
        {
          required: true,
          message: "请输入目录名称",
          trigger: "blur",
        },
      ],
      path: [
        {
          required: true,
          message: "请输入目录路径",
          trigger: "blur",
        },
      ],
    };

    async function queryDocById() {
      let result = await request({
        url: "/menu",
        data: {
          _id: docId,
        },
      });
      if (result.success) {
        Object.assign(formData, _.pick(result.data, ["name", "_id", "index", "parentId", "path"]));
      }
    }

    async function handleSave() {
      formRef.value
        .validate()
        .then(async isPass => {
          const result = await request({
            url: "/menu",
            method: isEdit.value ? "put" : "post",
            data: formData,
            showSuccessMsg: true,
          });
          if (result.success) {
            // 保存后，重新获取一次目录
            $store.dispatch(type.GET_MENU_LIST);
            $router.replace({
              name: "menuList",
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    async function handleDelete() {
      const result = await request({
        url: "/menu",
        method: "delete",
        data: {
          _id: docId,
        },
        showSuccessMsg: true,
      });
      if (result.success) {
        // 保存后，重新获取一次目录
        $store.dispatch(type.GET_MENU_LIST);
        $router.replace({
          name: "menuList",
        });
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
          <el-form-item label="目录名称" prop="name">
            <el-input type="text" v-model={formData.name} autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="目录路径" prop="path">
            <el-input type="text" v-model={formData.path} autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="父级目录" prop="parentId">
            <el-select vModel={formData.parentId}>
              {parentIdOptions.value.map(item => (
                <el-option label={item.label} value={item.value}></el-option>
              ))}
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="index">
            <el-input type="text" v-model={formData.index} autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" onClick={handleSave}>
              保存
            </el-button>
            {isEdit.value ? (
              <el-button type="danger" onClick={handleDelete}>
                删除
              </el-button>
            ) : null}
          </el-form-item>
        </el-form>
      </div>
    );
  },
});
</script>
