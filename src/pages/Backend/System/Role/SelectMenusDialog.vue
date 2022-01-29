<script lang="tsx">
export default defineComponent({
  setup() {
    let visible = ref(true);

    return () => {
      return (
        <el-dialog vModel={visible.value} title="选择可访问目录">
          <div>123123</div>
        </el-dialog>
      );
    };
  },
});
</script>
