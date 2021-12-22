<script lang="tsx">
import { ElMessage } from "element-plus";
export default {
  setup() {
    let $route = useRoute();
    let data = reactive({
      article: {
        title: "",
        content: "",
        createdAt: "",
      },
    });

    async function getArticleDetails() {
      let { id } = $route.params;
      if (id) {
        let result = await request({
          url: "/article",
          data: {
            _id: id,
          },
        });
        if (result.success) {
          // console.log(result.data);
          data.article = result.data;
        }
      } else {
        ElMessage("没有找到文章");
      }
    }

    onMounted(() => {
      getArticleDetails();
    });

    return () => (
      <div class="page">
        <div class="header">
          <div class="public-container wing-blank"></div>
        </div>
        <div class="article-title sticky-top">
          <h1 class="public-container wing-blank">{data.article.title}</h1>
        </div>
        <div class="article-info">
          <div class="public-container">
            <p>
              发布时间：
              {moment(data.article.createdAt).format("YYYY-MM-DD HH:mm")}
            </p>
            <div class="tags">
              <span>健康</span>
              <span>生活</span>
            </div>
          </div>
        </div>
        <div class="article-body">
          <div class="public-container wing-blank">
            <div class="article-content">{data.article.content}</div>
          </div>
        </div>
      </div>
    );
  },
};
</script>
<style lang="scss" scoped>
.page {
  background-color: #fafafa;
  padding-bottom: 300px;
}
.sticky-top {
  position: sticky;
  top: 0;
}

.header {
  height: 470px;
  max-height: 40vh;
  margin-bottom: 40px;
  color: #333;
  font-size: 24px;
  /* background-color: #e2e3ca; */
  background: center url(@assets/bedroom.jpg) no-repeat;
  background-position: 50% -560px;
  /* background-size: 1920px; */
  position: relative;
  overflow: hidden;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    /* height: 100px; */
    top: 0;
    filter: blur(20px);
    margin: -30px;
    background-color: rgba(255, 255, 255, 0.4);
  }
}
.article-title {
  background-color: #fafafa;
  border-bottom: 1px solid #eee;
  h1 {
    font-size: 30px;
    color: #444;
    padding: 20px 50px;
    font-weight: normal;
  }
}
.article-info {
  color: #666;
  margin-bottom: 70px;
  padding: 10px 0;
  > div {
    padding: 0 50px;
  }
  .tags {
    span {
      margin-right: 10px;
      display: inline-block;
      font-size: 14px;
      cursor: pointer;
      color: #999;
    }
  }
}
.article-body {
  padding: 20px 0;
  color: #333;
  img {
    max-width: 100%;
  }
  * {
    line-height: initial;
  }
  p {
    line-height: 2;
  }
}
.white-block {
  border-radius: 8px;
  /* background-color: rgba(255, 255, 255, 0.6); */
  /* box-shadow: 0 0 20px rgba(255, 255, 255, 0.7); */
  /* padding: 30px 50px; */
}

@media (max-width: 800px) {
  .white-block {
    border-radius: 0;
    padding: 10px 14px;
  }
}
</style>
