<template>
  <div class="article">
    <router-link v-for="i in 10" to="/article/details" :key="i">
      <p>文章1</p>
    </router-link>
  </div>
</template>

<script lang="ts">
export default {

}
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