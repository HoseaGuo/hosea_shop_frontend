
<script lang="ts">
import { ref } from "vue";
// import request from '../../../utils/request'
// import request from "@/utils/request";
// import request from '@element-plus/icons'
import "highlight.js/styles/vs2015.css"; // 引入高亮样式 这里我用的是sublime样式
// 引入处理markdown的web worker
import markedWorker from "./worker/markedWorker?url";
import request from "@utils/request";

export default {
  setup() {
    // 文章标题
    let title = ref("");

    // markdown原内容
    let markdown = ref("");

    // 用于预览的html
    let html = ref("");

    let timer: any = -1;

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
          markedWorkerConnect?.terminate();
        };

        markedWorkerConnect.postMessage(value);
      }, 200);
    }

    async function handleSubmit() {
      let postData = {
        title: title.value,
        content: markdown.value,
      };
      // console.log(postData);

      // let result: any = await request({
      //   url: "https://sdk.shruiwan.com/home/topics/5dc27f1354c21d27a3cd7500/json?app_id=5c64ca9454c21d3e66131409",
      // });
      // console.log(result);

      let result = await request({
        url: "/v1/article",
        method: "post",
        data: postData,
      });

      console.log(result);
    }

    return {
      title,
      markdown,
      html,
      handleInput,
      handleSubmit,
    };
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="top">
      <input
        v-model="title"
        type="text"
        class="article-title"
        placeholder="请输入标题"
      />
      <el-button type="primary" class="btn-submit" @click="handleSubmit"
        >保存</el-button
      >
    </div>
    <div class="article-content">
      <textarea @input="handleInput" v-model="markdown" />
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
.top {
  display: flex;
  .article-title {
    display: block;
    border: none;
    flex: 1;
    // border-bottom: 1px solid #ccc;
    background: #f8f8f8;
    padding: 10px;
    font-size: 20px;
    color: #666;
  }
  .btn-submit {
    margin-left: 10px;
    width: 80px;
  }
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