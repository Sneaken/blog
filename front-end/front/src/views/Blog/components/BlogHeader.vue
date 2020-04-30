<template>
  <header class="blog-header">
    <div class="blogger">
      <router-link class="link logo" to="/">Sneaker</router-link>
    </div>
    <nav class="nav">
      <ul class="blog-header-left">
        <li class="blog-header-left-item">
          <router-link class="link" to="/">首页</router-link>
        </li>
        <li class="blog-header-left-item">归档</li>
        <li class="blog-header-left-item">分类</li>
        <li class="blog-header-left-item">标签</li>
        <li class="blog-header-left-item">友链</li>
        <li class="blog-header-left-item">留言</li>
        <li class="blog-header-left-item">关于</li>
        <li class="blog-header-left-item">
          <label>
            <input type="text" placeholder="搜索" />
          </label>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BlogHeader extends Vue {}
</script>

<style lang="less" scoped>
@mp: {
  margin: 10px;
  padding: 5px;
};
.blog-header {
  color: whitesmoke;
}
.blogger {
  display: inline-block;
  @mp();
  color: #bbbfcb;
}
.nav {
  display: inline-block;
}
.blog-header-left {
  list-style-type: none;
  margin: 0;
  padding: 0;
  .blog-header-left-item {
    display: inline-block;
    @mp();
  }
}
.link {
  text-decoration: none;
}
.logo {
  text-align: center;
}
</style>
