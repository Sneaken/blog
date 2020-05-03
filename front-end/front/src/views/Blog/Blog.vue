<template>
  <div class="wrap">
    <blog-banner />
    <div class="blog-container">
      <div class="blog-container-center">
        <blog-main class="blog-main" />
      </div>
      <blog-aside-left class="blog-aside-left" />
      <blog-aside-right class="blog-aside-right" />
    </div>
    <blog-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BlogBanner from '@/views/Blog/components/BlogBanner.vue';
import BlogFooter from '@/views/Blog/components/BlogFooter.vue';
import BlogAsideLeft from '@/views/Blog/components/BlogAsideLeft.vue';
import BlogAsideRight from '@/views/Blog/components/BlogAsideRight.vue';
import BlogMain from '@/views/Blog/components/BlogMain.vue';
@Component({
  components: {
    BlogMain,
    BlogAsideRight,
    BlogAsideLeft,
    BlogFooter,
    BlogBanner,
  },
})
export default class Blog extends Vue {}
</script>

<style lang="less" scoped>
@leftWidth: 20vw;
@rightWidth: 35vw;
@mainHeight: 300px;
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
  /*background-color: #94e8ff;*/
}
.blog-aside-left {
  float: left;
  margin-left: -100%;
  width: @leftWidth;
  /*background-color: #ffb5bf;*/
}
.blog-aside-right {
  float: left;
  margin-left: -@rightWidth;
  width: @rightWidth;
  /*background-color: #8990d5;*/
}
@media (min-width: 900px) {
  .blog-aside-left {
    min-width: 300px;
  }
  .blog-aside-right {
    min-width: 525px;
  }
}
.footer {
  text-align: center;
}
</style>
