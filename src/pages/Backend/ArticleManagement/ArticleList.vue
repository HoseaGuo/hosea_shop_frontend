<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import request from "@utils/request";
import moment from "moment";

export default defineComponent({
  setup() {
    // 表格数据
    let tableData = ref([]);

    let columnData = ref([
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
        scopedSlots: {
          // default: () => {
          //   return <div>123</div>;
          // },
        },
      },
    ]);
    async function queryArticle() {
      let result: any = await request({
        url: "/v1/article",
      });
      if (result.success) {
        tableData.value = result.data;
      }
    }
    onMounted(() => {
      queryArticle();
    });

    return {
      queryArticle,
      tableData,
      columnData,
    };
  },
});
</script>

<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        v-for="(item, index) in columnData"
        :key="index"
        v-bind="item"
      />
    </el-table>
  </div>
</template>

<style lang="scss">
</style>


