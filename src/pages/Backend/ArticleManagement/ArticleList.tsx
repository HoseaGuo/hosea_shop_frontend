
import { defineComponent, onMounted, ref } from "vue";
import request from "@utils/request";
import moment from "moment";

export default defineComponent({
  setup() {
    // 表格数据
    let tableData = ref([
      {

      },
      {

      }
    ]);

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
          default: () => {
            return <>
              <el-button size="mini" type="primary">编辑</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </>
          },
        },
      },
    ]

    async function queryArticle() {
      let result: any = await request({
        url: "/v1/article",
      });
      if (result.success) {
        tableData.value = result.data;
      }
    }
    onMounted(() => {
      // queryArticle();
    });
    return () => {
      return <div>
        <el-table size="mini" data={tableData.value} border style={{ width: "100%" }}>
          {
            columnData.map((item, index) => {
              return <el-table-column key={index} {...item} v-slots={item.slots} />
            })
          }
        </el-table>
      </div>
    }
  },
});


