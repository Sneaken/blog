<template>
  <div class="blog-banner">
    <blog-header />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BlogHeader from '@/views/blog/components/BlogHeader.vue';
@Component({
  components: { BlogHeader },
})
export default class BlogBanner extends Vue {}
</script>

<style lang="less" scoped>
.blog-banner {
  height: 60vh;
  background: url('http://images.jasonpang.top/bg.jpg') no-repeat fixed center
    center;
  background-size: cover;
}
</style>
