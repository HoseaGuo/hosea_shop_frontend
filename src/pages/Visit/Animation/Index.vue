<script lang="tsx">
import Turntable from "./components/Turntable.vue"
export default defineComponent({
  setup() {

  },
  render() {
    return <div class="wrapper">
      <div class="block public-container">
        <div class="title">转盘抽奖</div>
        <div class="content">
          <Turntable />
        </div>
      </div>
    </div>
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  padding: 10px;
  padding-bottom: 100px;
  background-color: #eee;
  box-sizing: content-box;
}
.block {
  padding: 10px;
  background-color: #fff;
  .title {
    color: #999;
    margin-bottom: 20px;
  }
  .content {
    display: flex;
    justify-content: center;
  }
}
</style>