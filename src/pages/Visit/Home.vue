<script lang="tsx">
import { useHead } from "@vueuse/head";

export default {
  setup() {
    let title = "Hosea爱生活";
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

    onMounted(() => { });

    return () => (
      <div class="home-page">
        <h1>Hosea爱生活</h1>
        <div class="nav">
          <div class="item item-article">
            <router-link to="/article" class="inner">
              <span>文章</span>
            </router-link>
          </div>
          <div class="item item-animation">
            <router-link to="/other" class="inner">
              <span>其它</span>
            </router-link>
          </div>
          {/* 
          
          <div class="item">
            <router-link to="/article" class="inner">
              <span>文章</span>
            </router-link>
          </div>
          <div class="item">
            <router-link to="/article" class="inner">
              <span>文章</span>
            </router-link>
          </div> */}
        </div>
      </div>
    );
  },
};
</script>

<style lang="scss">
.home-page {
  min-height: 100vh;
  overflow: hidden;
  // background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);
  h1 {
    display: none;
  }
  .nav {
    width: 80%;
    margin: 100px auto;
    display: flex;
    .item {
      margin: 1%;
      width: 23%;
      height: 0;
      padding-bottom: 23%;
      position: relative;
      .inner {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #e3d6fb;
        border-radius: 50%;
        display: flex;
        span {
          margin: auto;
        }
      }
      a {
        text-decoration: none;
        color: #fff;
      }
      &.item-article {
        .inner {
          background: #7092d9;
        }
      }
      &.item-animation {
        .inner {
          background: #df963c;
        }
      }
      // width: 25vw;
      // height: 25vw;
      // display: flex;
      // .inner {
      //   margin: auto;
      //   width: 23vw;
      //   height: 23vw;
      //   background: lightblue;
      //   border-radius: 4px;
      // }
    }
  }
}
</style>
