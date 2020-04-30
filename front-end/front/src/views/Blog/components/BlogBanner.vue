<template>
  <div class="blog-banner">
    <blog-header />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BlogHeader from '@/views/Blog/components/BlogHeader.vue';
@Component({
  components: { BlogHeader },
})
export default class BlogBanner extends Vue {}
</script>

<style lang="less" scoped>
.blog-banner {
  height: 60vh;
  background: url('http://q8m49i3f9.bkt.clouddn.com/bg.jpg') no-repeat fixed
    center center;
  background-size: cover;
}
</style>
