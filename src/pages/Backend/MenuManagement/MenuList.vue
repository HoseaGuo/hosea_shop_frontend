<script lang="tsx">
import { onMounted, ref } from "vue";
// import request from "@utils/request";
import moment from "moment";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

export default {
  setup() {
    // 表格数据
    let tableData = ref([]);

    let treeData = reactive([
      {
        id: 1,
        label: "目录管理",
        children: [
          {
            id: 4,
            label: "目录列表",
          },
        ],
      },
    ]);

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
        // ElMessage.success(result.msg);
        queryList();
      }
    }

    // 编辑文章
    async function editArticle(row) {
      // 跳转到编辑页面
      $router.push({
        name: "menuEdit",
        params: {
          id: row._id,
        },
      });
    }

    // 查询列表
    async function queryList() {
      let result = await request({
        url: "/menu",
        showSuccessMsg: true,
      });
      if (result.success) {
        tableData.value = result.data;
      }
    }

    onMounted(() => {
      // queryList();
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
          <div>
            <el-tree default-expand-all={true} data={treeData} node-key="_id" />
          </div>
        </div>
      );
    };
  },
};
</script>
