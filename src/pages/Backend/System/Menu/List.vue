<script lang="tsx">
import { onMounted, ref } from "vue";
import { buildTree } from "@utils/index";
import moment from "moment";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import * as type from "@store/mutation-types";

export default defineComponent({
  setup() {
    let menuList = computed(() => $store.state.menu.menuList);

    // 树数据
    let treeData = computed(() => {
      return buildTree(menuList.value);
    });

    let $router = useRouter();

    // 删除文章
    async function deleteMenu(row) {
      let result = await request({
        url: "/menu",
        method: "delete",
        data: {
          _id: row._id,
        },
      });
      if (result.success) {
        // queryList();
      }
    }

    // 点击目录节点，进行编辑
    function handleNodeClick(node) {
      $router.push({
        name: "menuEdit",
        params: {
          id: node._id,
        },
      });
    }

    onMounted(() => {
      // 获取目录数据
      if (menuList.value.length === 0) {
        $store.dispatch(type.GET_MENU_LIST);
      }
    });

    return () => {
      return (
        <div>
          <div style="margin-bottom: 10px; text-align: right;">
            <router-link to={{ name: "menuCreate" }}>
              <el-button type="primary" size="mini">
                新增
              </el-button>
            </router-link>
          </div>
          <p class="tips">提示：点击目录节点进行编辑</p>
          <div>
            <el-tree
              expand-on-click-node={false}
              onNodeClick={handleNodeClick}
              props={{ label: "name" }}
              default-expand-all={true}
              data={treeData.value}
              node-key="_id"
            />
          </div>
        </div>
      );
    };
  },
});
</script>
