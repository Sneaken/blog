<template>
  <div>
    <blog-banner />
    <div class="blog-container">
      <div class="blog-container-center">
        <blog-content
          v-if="data && data.content"
          class="blog-main"
          :data="data.content"
        />
        <sk-back-top />
      </div>
      <article-directory
        v-if="data && data.content"
        class="directory"
        :data="data.content"
      />
    </div>
    <blog-footer />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BlogBanner from '@/components/BlogBanner.vue';
import BlogFooter from '@/components/BlogFooter.vue';
import SkBackTop from '@/components/SkBackTop.vue';
import BlogContent from '@/views/detail/components/BlogContent.vue';
import { getBlog } from '@/api/blog-detail';
import ArticleDirectory from '@/views/detail/components/ArticleDirectory.vue';
@Component({
  components: {
    ArticleDirectory,
    BlogContent,
    SkBackTop,
    BlogFooter,
    BlogBanner,
  },
})
export default class DetailPage extends Vue {
  private data: Blog | null = null;

  @Prop({ type: String, required: true })
  private id!: string;

  private mounted() {
    this.getData();
  }

  async getData() {
    try {
      this.data = await getBlog(this.id);
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style lang="less" scoped>
@leftWidth: 30vw;
@rightWidth: 35vw;
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
}
.directory {
  position: fixed;
  top: 100px;
}
.blog-aside-right {
  float: left;
  margin-left: -@rightWidth;
  width: @rightWidth;
}
@media (min-width: 900px) {
  .directory {
    min-width: 300px;
  }
  .blog-aside-right {
    min-width: 525px;
  }
}
.blog-main {
  margin: 10px auto;
  max-width: 600px;
}
</style>
