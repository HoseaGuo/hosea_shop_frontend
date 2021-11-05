<template>
  <div>
    <h1>{{title}}</h1>
    <div v-html="content"></div>
  </div>
</template>
<script lang="ts">
// import { useContext } from 'vite-ssr'
import request from '../../utils/request'

export default {
  async setup() {
    let result: any = await request({
      url: "https://sdk.shruiwan.com/home/topics/5dc27f1354c21d27a3cd7500/json?app_id=5c64ca9454c21d3e66131409"
    });

    let data: any = {};

    if(result.success){
      data = result.data.msg;
    }

    return { 
      title: data.title,
      content: data.content
    }
  },
}
</script>