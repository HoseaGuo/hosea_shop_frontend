<script lang="tsx">
import { useHead } from "@vueuse/head";
export default {
  setup() {
    let title = "文章列表 - Hosea爱生活";
    useHead({
      title,
      meta: [
        {
          name: "keywords",
          content: title,
        },
        {
          name: "description",
          content: title,
        },
      ],
    });

    let articleList = ref([]);

    // 获取文章列表
    async function getArticleList() {
      let result = await request({
        url: "/article",
        showMsg: false,
      });
      if (result.success) {
        articleList.value = result.data.list;
      }
    }

    onMounted(() => {
      getArticleList();
    });

    return () => (
      <div class="article">
        {articleList.value.map((article: any, index) => {
          return (
            <router-link key={index} to={`/article/${article._id}`}>
              <p>{article.title}</p>
            </router-link>
          );
        })}
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
