
<script lang="ts">
import { ref } from "vue";
// @ts-ignore
import { marked } from "marked";
import hljs from "highlight.js"; // 引入 highlight.js
import "highlight.js/styles/vs2015.css"; // 引入高亮样式 这里我用的是sublime样式
import markedWorker from "./worker/markedWorker?url";

marked.setOptions({
  renderer: new marked.Renderer(),
  // highlight: function (code) {
  //   return hljs.highlightAuto(code).value;
  // },
  pedantic: false,
  gfm: true,
  // tables: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

export default {
  setup() {
    let html = ref("");

    let timer = -1;

    let markedWorkerConnect;

    function handleInput(e: Event) {
      let { value } = e.target as any;
      clearTimeout(timer);
      markedWorkerConnect?.terminate();
      timer = setTimeout(() => {
        markedWorkerConnect = new Worker(markedWorker, {
          type: "module",
        });

        markedWorkerConnect.onmessage = function (e) {
          html.value = e.data;
        };

        markedWorkerConnect.postMessage(value);

        // html.value = marked(value);

        // html.value = marked(value).replace(
        //   /(<code>)(.*?)(<\/code>)/gs,
        //   function ($1, $2, $3, $4) {
        //     let v = hljs.highlightAuto($3).value;
        //     return $2 + v + $4;
        //   }
        // );
      }, 200);
    }

    return {
      html,
      handleInput,
    };
  },
};
</script>

<template>
  <div class="wrapper">
    <input type="text" class="article-title" placeholder="请输入标题" />
    <div class="article-content">
      <textarea @input="handleInput" />
      <div class="article-preview" v-html="html"></div>
    </div>
  </div>
</template>

<style lang="scss">
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.article-title {
  display: block;
  border: none;
  width: 100%;
  // border-bottom: 1px solid #ccc;
  background: #f8f8f8;
  padding: 10px;
  font-size: 20px;
  color: #666;
}
.article-content {
  margin-top: 10px;
  display: flex;
  flex: 1;
  height: 0;
  textarea {
    display: block;
    width: 0;
    flex: 1;
    padding: 10px;
    resize: none;
    border: none;
    background: #f8f8f8;
    // word-break: break-all;
    white-space: pre-wrap;
    overflow: auto;
  }
  .article-preview {
    margin-left: 10px;
    flex: 1;
    width: 0;
    padding: 10px;
    background: #f8f8f8;
    // border-left: 1px solid #dedede;
    flex: 1;
    overflow: auto;
    // padding: 20px 20px 20px;
    word-break: break-all;
    pre {
      word-wrap: normal;
      word-break: break-all;
      white-space: pre;
      overflow: auto;
      margin-bottom: 20px;
      // padding: 10px;
      // border: 1px solid #d9d9d9;
      border-radius: 0;
      line-height: 20px;
      // background-color: #1e1e1e;
      // code {
      //   color: #abb2bf;
      // }
    }
  }
}
</style>