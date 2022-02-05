<script lang="tsx">
import { onMounted, ref } from "vue";
// import request from "@utils/request";
import moment from "moment";
import { useRouter } from "vue-router";
import CustomTable from "@components/CustomTable.vue";

export default {
  setup() {
    const tabelRef = ref<any>(null);
    // 表格数据
    let tableData = ref([]);

    let $router = useRouter();

    let columnData = [
      {
        prop: "name",
        label: "角色名",
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
                <el-button size="mini" type="primary" onclick={handleEdit.bind(null, row)}>
                  编辑
                </el-button>
                <el-button size="mini" type="danger" onclick={handleDelete.bind(null, row)}>
                  删除
                </el-button>
              </>
            );
          },
        },
      },
    ];

    // 删除文章
    async function handleDelete(row) {
      let result = await request({
        url: "/role",
        method: "delete",
        data: {
          _id: row._id,
        },
        showSuccessMsg: true,
      });
      if (result.success) {
        tabelRef.value.query();
      }
    }

    // 编辑
    async function handleEdit(row) {
      // 跳转到编辑页面
      $router.push({
        name: "roleEdit",
        params: {
          id: row._id,
        },
      });
    }

    // 查询列表
    async function queryList() {
      let result = await request({
        url: "/role",
        showMsg: false,
      });
      if (result.success) {
        tableData.value = result.data;
      }
    }

    onMounted(() => {
      queryList();
    });

    return () => {
      return (
        <div>
          <div style="margin-bottom: 10px; text-align: right;">
            <router-link to={{ name: "roleCreate" }}>
              <el-button type="primary" size="mini">
                新增
              </el-button>
            </router-link>
          </div>
          <CustomTable ref={tabelRef} columnData={columnData} url="/role" />
        </div>
      );
    };
  },
};
</script>
