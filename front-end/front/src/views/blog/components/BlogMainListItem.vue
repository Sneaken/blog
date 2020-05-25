<template>
  <div class="list-item">
    <div class="list-item-top">
      <h3 class="list-item-top-title">{{ data.title }}</h3>
      <div>
        <span class="middle" v-if="releaseTime">
          <i class="el-icon-date" />
          {{ releaseTime }}
        </span>
        <span class="middle">
          <i class="el-icon-chat-dot-round" />
          {{ comments }}
        </span>
      </div>
      <div v-html="content" />
      <sk-tag v-for="tag in data.tags" :key="tag"> {{ tag }}</sk-tag>
    </div>
    <div class="list-item-bottom">
      <sk-button size="small" type="primary"
        >阅读更多 <i class="el-icon-arrow-right"
      /></sk-button>
      <div v-if="lastModified">最后修改时间：{{ lastModified }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SkTag from '@/components/tag/SkTag.vue';
import SkButton from '@/components/button/SkButton.vue';
import MarkdownIt from 'markdown-it/lib';
import hljs from 'highlight.js';

const md: MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${
          hljs.highlight(lang, str, true).value
        }</code></pre>`;
      } catch (__) {
        console.log(__);
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

@Component({
  components: { SkButton, SkTag },
})
export default class BlogMainListItem extends Vue {
  @Prop({ type: Object, required: true })
  private readonly data!: BlogListItem;

  private get releaseTime(): string {
    return this.data.createdAt.split('T').shift() || '';
  }
  private get lastModified(): string {
    return this.data.updatedAt.split('T').shift() || '';
  }

  private get totalText(): number {
    return ((this.data.content.length / 1000) * 3) | 0;
  }

  private get estimatedReadingTime(): number {
    // 在中文环境下，成人的平均阅读速度为 500 字/分钟。
    const result = (this.totalText / 500) | 0;
    if (result === 0) {
      return 1;
    }
    return result;
  }

  private get content(): string {
    return md.render(this.data.content);
  }

  private comments = '1';
}
</script>

<style lang="less" scoped>
@media (min-width: 900px) {
  .middle {
    display: inline-flex;
    align-items: center;
    &:not(:last-child) {
      margin-right: 8px;
    }
    i {
      padding-right: 1px;
    }
  }
  .list-item {
    border: 1px solid #ebeef5;
    border-radius: 8px;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
  .list-item-top {
    margin: 10px;
    border-bottom: 1px solid #298dff;
    padding: 10px;
  }
  .list-item-top-title {
    transition: color 0.3s;
    &:hover {
      color: #8cc5ff;
    }
  }
  .list-item-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
  }
}
</style>
