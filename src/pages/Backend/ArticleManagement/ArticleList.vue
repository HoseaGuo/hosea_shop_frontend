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

    let $router = useRouter();

    let columnData = [
      {
        prop: "title",
        label: "标题",
      },
      {
        prop: "createdAt",
        label: "创建时间",
        formatter: function (row, column, cellValue, index) {
          return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
        },
      },
      {
        prop: "updatedAt",
        label: "修改时间",
        formatter: function (row, column, cellValue, index) {
          return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
        },
      },
      {
        prop: "",
        label: "操作",
        slots: {
          default: ({ row }) => {
            return (
              <>
                <el-button
                  size="mini"
                  type="primary"
                  onclick={editArticle.bind(null, row)}
                >
                  编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  onclick={deleteArticle.bind(null, row)}
                >
                  删除
                </el-button>
              </>
            );
          },
        },
      },
    ];

    // 删除文章
    async function deleteArticle(row) {
      let result = await request({
        url: "/v1/article",
        method: "delete",
        data: {
          _id: row._id,
        },
      });
      if (result.success) {
        ElMessage.success(result.msg);
        queryArticle();
      }
    }

    // 编辑文章
    async function editArticle(row) {
      // 跳转到编辑页面
      $router.push({
        name: "articleEdit",
        params: {
          id: row._id,
        },
      });
    }

    // 编辑文章

    // 查询列表
    async function queryArticle() {
      let result = await request({
        url: "/v1/article",
      });
      if (result.success) {
        tableData.value = result.data;
      }
    }

    onMounted(() => {
      queryArticle();
    });

    return () => {
      return (
        <div>
          <div style="margin-bottom: 10px;">
            <router-link to={{ name: "articleCreate" }}>
              <el-button type="primary" size="mini">
                新增
              </el-button>
            </router-link>
          </div>
          <el-table
            size="mini"
            data={tableData.value}
            border
            style={{ width: "100%" }}
          >
            {columnData.map((item, index) => {
              return (
                <el-table-column key={index} {...item} v-slots={item.slots} />
              );
            })}
          </el-table>
        </div>
      );
    };
  },
};
</script>
