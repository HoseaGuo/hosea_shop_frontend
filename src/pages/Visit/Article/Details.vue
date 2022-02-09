<script lang="tsx">
import "highlight.js/styles/vs2015.css"; // 引入高亮样式 这里我用的是sublime样式
import { ElMessage } from "element-plus";
import marked from "@utils/marked";
import { useHead } from "@vueuse/head";
import { useContext } from 'vite-ssr'

export default defineComponent({
  async setup() {
    let $route = useRoute();
    let $router = useRouter();
    let article = reactive({
      title: "",
      content: "",
      createdAt: "",
      readCount: 0
    });

    let title = computed(() => {
      return `${article.title} - Hosea爱生活`;
    });

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

    function noArticle() {
      ElMessage({
        type: "info",
        duration: 1300,
        message: "没有文章",

      });
      setTimeout(() => {
        $router.replace({
          path: "/article"
        })
      }, 1500)
    }

    async function getArticleDetails() {
      let { id } = $route.params;
      /* 
        利用useContext，获取initialState，来判断是否已经获取过数据，从而避免在服务端渲染重复获取数据。
       */
      const { initialState } = useContext();

      const articleKey = id + "";

      initialState["article"] = initialState["article"] || {};

      const articleState = ref(initialState["article"])

      if (articleState.value[articleKey]) {
        Object.assign(article, articleState.value[articleKey]);
      } else {
        if (id) {
          let result = await request({
            url: "/article",
            data: {
              _id: id,
            },
            showErrorMsg: false
          });
          if (result.success) {
            Object.assign(article, result.data);

            initialState["article"][articleKey] = result.data;
          } else {
            noArticle();
          }
        } else {
          noArticle();
        }
      }
    }

    // 加载文章数据
    await getArticleDetails();

    return {
      article
    }
  },
  render() {
    return <div class="page">
      <div class="header">
        <div class="public-container wing-blank"></div>
      </div>
      <div class="article-title sticky-top">
        <h1 class="public-container wing-blank">{this.article.title}</h1>
      </div>
      {
        this.article.title && <>
          <div class="article-info">
            <div class="public-container">
              <div class="base">
                <span>
                  {moment(this.article.createdAt).format("YYYY-MM-DD HH:mm")}
                </span>
                <span>
                  阅读 {this.article.readCount}
                </span>
              </div>
              {/* <div class="tags">
                <span>健康</span>
                <span>生活</span>
              </div> */}
            </div>
          </div>
          <div class="article-body">
            <div class="public-container wing-blank">
              <div
                class="article-content"
                innerHTML={marked(this.article.content)}
              ></div>
            </div>
          </div>
        </>
      }
    </div>
  }
});
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
  // color: #333;
  margin-bottom: 70px;
  padding: 10px 0;
  > div {
    padding: 0 50px;
  }
  .base {
    font-size: 14px;
    color: #999;
    span {
      display: inline-block;
      margin-right: 10px;
    }
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

@media screen and (max-width: 800px) {
  .header {
    margin-bottom: 10px;
    max-height: 20vh;
    background-size: cover;
    background-position: center;
  }
  .article-title h1 {
    padding: 10px 4px;
    font-size: 20px;
    white-space: nowrap;
    overflow: auto;
  }

  .article-info {
    margin-bottom: 20px;
    > div {
      padding: 0 10px;
    }
  }

  .article-body {
    padding: 0;
  }

  .white-block {
    border-radius: 0;
    padding: 10px 14px;
  }
}
</style>
