<template>
  <main class="main">
    <blog-main-list-item v-for="item in list" :key="item._id" :data="item" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BlogMainListItem from '@/views/blog/components/BlogMainListItem.vue';
import { blogList } from '@/api/blog-index';

@Component({
  components: { BlogMainListItem },
})
export default class BlogMain extends Vue {
  private list: BlogListItem[] = [];
  mounted() {
    this.getList();
  }

  async getList() {
    try {
      this.list = await blogList();
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin-top: 3vh;
  padding: 3vw;
  background-color: #fff;
}
</style>
