<script lang="tsx">
import { onMounted, ref } from "vue";
// import request from "@utils/request";
import moment from "moment";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import CustomTable from "@components/CustomTable.vue";

export default defineComponent({
  setup() {
    const tabelRef = ref<any>(null);
    // 表格数据
    let tableData = ref([]);

    let $router = useRouter();

    let columnData = [
      {
        prop: "title",
        label: "标题",
        slots: {
          default: ({ row }) => {
            return (
              <>
                <a href={`/article/${row._id}`} target="_blank">{row.title}</a>
              </>
            );
          },
        },
      },
      {
        prop: "readCount",
        label: "阅读量",
        width: 80
      },
      {
        prop: "createdAt",
        label: "创建时间",
        width: 150,
        formatter: function (row, column, cellValue, index) {
          return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
        },
      },
      {
        prop: "updatedAt",
        label: "修改时间",
        width: 150,
        formatter: function (row, column, cellValue, index) {
          return moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
        },
      },
      {
        prop: "",
        label: "操作",
        width: 160,
        slots: {
          default: ({ row }) => {
            return (
              <>
                <el-button size="small" type="primary" onclick={editArticle.bind(null, row)}>
                  编辑
                </el-button>
                <el-button size="small" type="danger" onclick={deleteArticle.bind(null, row)}>
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
        url: "/article",
        method: "delete",
        data: {
          _id: row._id,
        },
        showSuccessMsg: true
      });
      if (result.success) {
        tabelRef.value.query();
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
        url: "/article",
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
          <div style="margin-bottom: 10px; text-align: right;">
            <router-link to={{ name: "articleCreate" }}>
              <el-button type="primary" size="mini">
                新增
              </el-button>
            </router-link>
          </div>
          <CustomTable ref={tabelRef} columnData={columnData} url="/article" />
        </div>
      );
    };
  },
});
</script>
