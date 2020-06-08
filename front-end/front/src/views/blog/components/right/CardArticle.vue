<template>
  <card shadow="always">
    <template #header>
      最火文章
    </template>
    <ul class="list">
      <li class="list-item" v-for="item in articleList" :key="item._id">
        <router-link
          :to="{ name: 'DetailPage', params: { id: item._id } }"
          :title="item.title"
        >
          {{ item.title }}
        </router-link>
      </li>
    </ul>
  </card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import { latestBlogList } from '@/api/blog-index';
@Component({
  components: { Card },
})
export default class CardArticle extends Vue {
  private articleList: HotBlog[] = [];
  async mounted() {
    this.articleList = await latestBlogList();
  }
}
</script>

<style lang="less" scoped>
.list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  .list-item {
    padding: 5px 0;
  }
  a {
    text-decoration: none;
  }
}
</style>
