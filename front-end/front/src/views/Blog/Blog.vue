<template>
  <div class="wrap">
    <blog-banner />
    <div class="blog-container">
      <div class="blog-container-center">
        <main class="blog-main">
          main
        </main>
      </div>
      <aside class="blog-aside-left">左侧边栏</aside>
      <aside class="blog-aside-right">右侧边栏</aside>
    </div>
    <blog-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BlogBanner from '@/views/Blog/components/BlogBanner.vue';
import BlogFooter from '@/views/Blog/components/BlogFooter.vue';
@Component({
  components: { BlogFooter, BlogBanner },
})
export default class Blog extends Vue {}
</script>

<style lang="less" scoped>
@leftWidth: 350px;
@rightWidth: 700px;
@mainHeight: 1000px;
.blog-container {
  overflow: hidden;
}
.blog-container-center {
  float: left;
  width: 100%;
}
.blog-container-center .blog-main {
  margin-left: @leftWidth;
  margin-right: @rightWidth;
  height: @mainHeight;
  background-color: #94e8ff;
}
.blog-aside-left {
  float: left;
  margin-left: -100%;
  width: @leftWidth;
  background-color: #ffb5bf;
}
.blog-aside-right {
  float: left;
  margin-left: -@rightWidth;
  width: @rightWidth;
  background-color: #8990d5;
}
.footer {
  text-align: center;
}
</style>
