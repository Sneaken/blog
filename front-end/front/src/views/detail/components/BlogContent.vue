<template>
  <main>
    <article>
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
    console.log(str);
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
    this.content = this.search(md.render(this.data));
  }

  search(content: string) {
    const re = /<(h\d)>(.*)<\/h\d>/g;
    let matcher;
    const replaceList = [];
    let id = 0;
    while ((matcher = re.exec(content)) !== null) {
      replaceList.push({
        source: matcher[0],
        target: `<${matcher[1]} id="heading-${id}">${matcher[2]}</${matcher[1]}>`,
      });
      id++;
    }
    replaceList.forEach(item => {
      content = content.replace(item.source, item.target);
    });
    return content;
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
