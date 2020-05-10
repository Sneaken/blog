<template>
  <main class="main">
    <blog-main-list-item />
    <sk-image :src="src" lazy :preview-src-list="srcList" />
  </main>
</template>
v-on="$listeners"
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SkIcon from '@/components/SkIcon.vue';
import Card from '@/components/Card.vue';
import BlogMainListItem from '@/views/Blog/components/BlogMainListItem.vue';
import SkImage from '@/components/image/SkImage.vue';
@Component({
  components: { SkImage, BlogMainListItem, Card, SkIcon },
})
export default class BlogMain extends Vue {
  private src = 'http://q8m49i3f9.bkt.clouddn.com/bg.jpg';
  private srcList = [
    'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
    'http://q8m49i3f9.bkt.clouddn.com/bg.jpg',
  ];
}
</script>

<style lang="less" scoped>
.main {
  margin-top: 3vh;
  padding: 3vw;
  background-color: #fff;
}
</style>
