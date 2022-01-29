<script lang="tsx">
import { on } from "events";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    /** 请求链接 */
    url: {
      type: String,
    },
    /** 列配置 */
    columnData: {
      type: Array,
      default: () => [],
    },
    /** test */
    test: {
      type: Array,
    },
  },
  setup(props, context) {
    const tableData = ref([]);
    const loading = ref(false);
    let queryTimer;

    const pageConfig = reactive({
      pageSize: 10,
      pageNumber: 1,
      total: 0
    })

    const { columnData, url, ...rest } = props;

    async function query() {
      clearTimeout(queryTimer);
      queryTimer = setTimeout(async () => {
        loading.value = true;
        let result = await request({
          url,
          data: {
            pageSize: pageConfig.pageSize,
            pageNumber: pageConfig.pageNumber
          }
        });
        loading.value = false;
        if (result.success) {
          tableData.value = result.data.list;
          pageConfig.total = result.data.total;
        }
      }, 100)
    }

    function handleSizeChange(size) {
      pageConfig.pageSize = size;
      pageConfig.pageNumber = 1;
      query();
    }

    function handleCurrentChange(current) {
      pageConfig.pageNumber = current;
      query();
    }

    onMounted(() => {
      if (url) {
        query();
      }
    });

    // columnData
    return {
      tableData,
      pageConfig,
      loading,
      handleSizeChange,
      handleCurrentChange,
      query
    }
  },
  render(props) {
    return <div>
      <el-table
        v-loading={this.loading}
        size="small"
        data={this.tableData}
        border
        style={{ width: "100%" }}
      >
        {props.columnData.map((item: any, index: any) => {
          return <el-table-column key={index} {...item} v-slots={item.slots} />;
        })}
      </el-table>
      <div style="text-align: right;margin-top: 10px;">
        <el-pagination
          small
          page-sizes={[10, 50]}
          page-size={this.pageConfig.pageSize}
          current-page={this.pageConfig.pageNumber}
          layout="total, sizes, prev, pager, next"
          total={this.pageConfig.total}
          background
          onSizeChange={this.handleSizeChange}
          onCurrentChange={this.handleCurrentChange}
        />
      </div>
    </div >
  }
});
</script>
