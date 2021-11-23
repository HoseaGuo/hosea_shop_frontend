import { css, cx } from '@emotion/css';
import { useHead } from '@vueuse/head';
import styled from '@emotion/styled'


let div = styled.div`
  color: red;
  .inner{
    background-color: blue;
    .child{
      text-align: unset;
    }
  }
`

console.log(div)

const mainCls = css`
  min-height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);
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
        background-color: #e3d6fb;
        border-radius: 2vw;
        display: flex;
        span {
          margin: auto;
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
`

console.log(mainCls)

let style = `
  .home-page{
    min-height: 100vh;
    overflow: hidden;
    background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);
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
          background-color: #e3d6fb;
          border-radius: 2vw;
          display: flex;
          span {
            margin: auto;
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
`

export default {
  setup() {
    useHead({
      // Can be static or computed
      title: "home",
      meta: [
        {
          name: `description`,
          content: "vite ssr home page",
        },
      ],
      style: [
        {
          children: style,
        },
      ]
    })

    return () => (
      <div class="home-page">
        <h1>Hosea爱生活</h1>
        <div class="nav">
          <div class="item">
            <router-link to="/article" class="inner">
              <span>文章</span>
            </router-link>
          </div>
          <div class="item">
            <router-link to="/article" class="inner">
              <span>文章</span>
            </router-link>
          </div>
          <div class="item">
            <router-link to="/article" class="inner">
              <span>文章</span>
            </router-link>
          </div>
          <div class="item">
            <router-link to="/article" class="inner">
              <span>文章</span>
            </router-link>
          </div>
        </div>
      </div>
    )
  }
}

