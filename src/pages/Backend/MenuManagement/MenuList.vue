<script lang="tsx">
import { onMounted, ref } from "vue";
// import request from "@utils/request";
import moment from "moment";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import * as type from "@store/mutation-types";

export default {
  setup() {
    // const t = computed( () => {
    //   let menuList = $store.state.menu.menuList;
    //   return buildTree(menuList)
    // })

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

    // 生成树的方法
    function buildTree(
      array: any[],
      options: {
        parentId: string | number;
        parentIdKey: string;
        childrenKey: string;
        primaryKey: string;
      } = { parentIdKey: "parentId", parentId: "0", childrenKey: "children", primaryKey: "_id" }
    ) {
      let newArray: any[] = [];

      array.forEach(item => {
        if (item[options.parentIdKey] === options.parentId) {
          let _item = Object.assign({}, item);
          let innerOptions = Object.assign({}, options, { parentId: item[options.primaryKey] });
          let children = buildTree(array, innerOptions);
          if (children.length) {
            _item[options.childrenKey] = children;
          }
          newArray.push(_item);
        }
      });
      return newArray;
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
          <div style="margin-bottom: 10px;">
            <router-link to={{ name: "menuCreate" }}>
              <el-button type="primary" size="mini">
                新增
              </el-button>
            </router-link>
          </div>
          <p class="tips">提示：点击目录节点进行编辑</p>
          <div>
            <el-tree expand-on-click-node={false} onNodeClick={handleNodeClick} props={{ label: "name" }} default-expand-all={true} data={treeData.value} node-key="_id" />
          </div>
        </div>
      );
    };
  },
};
</script>
