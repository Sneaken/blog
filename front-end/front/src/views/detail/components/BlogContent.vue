<template>
  <main>
    <article>
      <h1>标题</h1>
      <div class="blog-content" v-html="content" />
    </article>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
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
@Component
export default class BlogContent extends Vue {
  @Prop({ type: String, required: true })
  private readonly data!: string;

  private content = '';

  private mounted() {
    this.content = md.render(this.data);
  }
}
</script>

<style lang="less" scoped>
.blog-content {
  padding: 10px;
  /deep/ ul {
    list-style-type: none;
  }
}
</style>
