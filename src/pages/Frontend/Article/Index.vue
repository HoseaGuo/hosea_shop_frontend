<script lang="tsx">
// import request from "@utils/request";
import { ref, onMounted } from "vue";
export default {
  setup() {
    let articleList = ref([]);

    // 获取文章列表
    async function getArticleList() {
      console.log(request);
      // let result = await request({
      //   url: "/v1/article",
      // });
      // if (result.success) {
      //   console.log(result.data);
      // }
    }

    onMounted(() => {
      getArticleList();
    });

    return () => (
      <div class="article">
        {
          <router-link to="/article/details">
            <p>文章1</p>
          </router-link>
        }
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.article {
  margin: 10px auto;
  max-width: 500px;
  p {
    line-height: 1.5;
  }
}
</style>
