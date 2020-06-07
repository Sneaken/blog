<template>
  <div class="wrap">
    <!--header-->
    <main class="main">
      <article class="article-area">
        <div class="blog-main">
          <h1 v-if="data && data.title" class="title">{{ data.title }}</h1>
          <blog-content
            ref="section"
            v-if="data && data.content"
            :data="data.content"
          />
        </div>
        <div class="blog-right" ref="right">
          <article-author />
          <article-types v-if="data && data.type" :types="data.type" />
          <article-tags v-if="data && data.tags" :tags="data.tags" />
          <article-directory
            v-if="data && data.content"
            ref="directory"
            :class="[
              'directory',
              {
                'directory-fixed': top <= 0,
              },
            ]"
            :data="data.content"
            :margin-top="top >= -20 ? 0 : top + 20"
          />
        </div>
      </article>
      <sk-back-top :bottom="150" />
    </main>
    <blog-footer />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
import BlogBanner from '@/components/BlogBanner.vue';
import BlogFooter from '@/components/BlogFooter.vue';
import SkBackTop from '@/components/SkBackTop.vue';
import BlogContent from '@/views/detail/components/BlogContent.vue';
import { getBlog } from '@/api/blog-detail';
import ArticleDirectory from '@/views/detail/components/ArticleDirectory.vue';
import { throttle } from '@/utils/throttle-debounce';
import ArticleTags from '@/views/detail/components/ArticleTags.vue';
import ArticleTypes from '@/views/detail/components/ArticleTypes.vue';
import CardInfo from '@/views/blog/components/left/CardInfo.vue';
import ArticleAuthor from '@/views/detail/components/ArticleAuthor.vue';

@Component({
  components: {
    ArticleAuthor,
    CardInfo,
    ArticleTypes,
    ArticleTags,
    ArticleDirectory,
    BlogContent,
    SkBackTop,
    BlogFooter,
    BlogBanner,
  },
})
export default class DetailPage extends Vue {
  @Prop({ type: String, required: true })
  private id!: string;
  @Ref('right')
  private readonly right!: HTMLDivElement;
  @Ref('section')
  private readonly section!: BlogContent;
  @Ref('directory')
  private readonly directory!: ArticleDirectory;

  private data: Blog | null = null;
  private _scrollHandler!: EventListenerOrEventListenerObject;
  private top = Infinity;
  private titleTop: number[] = [];

  private get children(): HTMLCollection {
    return this.right.children;
  }
  private get aList(): HTMLAnchorElement[] {
    return [
      ...this.directory.$el.children[1].children[0].getElementsByTagName('a'),
    ];
  }

  private async mounted() {
    await this.getData();
    await this.getTitleTop();
    this.aList[0].classList.add('current');
    this._scrollHandler = throttle(40, this.handleScroll);
    document.addEventListener('scroll', this._scrollHandler);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('scroll', this._scrollHandler);
    });
  }

  async getData() {
    try {
      this.data = await getBlog(this.id);
    } catch (e) {
      console.log(e);
    }
  }
  private handleScroll() {
    const len = this.children.length;
    const { height, top } = this.children[len - 2].getBoundingClientRect();
    this.top = top + height;
    const pageYOffset = window.pageYOffset;
    this.titleTop.forEach((title, index) => {
      this.aList.forEach(a => {
        if (a.href.split('#heading-')[1] === index.toString()) {
          if (index === 0 && pageYOffset < title) {
            // 默认第一个
            a.classList.add('current');
            return;
          }
          if (
            pageYOffset >= title &&
            this.titleTop[index + 1] &&
            pageYOffset < this.titleTop[index + 1]
          ) {
            // 当内容在 当前标题 和 下节标题 之间时
            a.classList.add('current');
          } else {
            a.classList.remove('current');
          }
          if (index === this.aList.length - 1 && pageYOffset >= title) {
            // 最后一个
            a.classList.add('current');
          }
        }
      });
    });
  }
  private async getTitleTop() {
    await this.$nextTick();
    [...(this.section.$el as HTMLElement).children].forEach(item => {
      const id = item.attributes.getNamedItem('id');
      if (id) {
        this.titleTop.push(item.getBoundingClientRect().top);
      }
    });
  }
}
</script>

<style lang="less" scoped>
.wrap {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
}
.main {
  margin: 10px auto;
  padding-bottom: 132px;
  width: 100%;
  max-width: 1200px;
  flex: 1;
}
.article-area {
  position: relative;
  box-sizing: border-box;
  border-radius: 2px;
  width: 100%;
}
.blog-main {
  margin-right: 260px;
  padding: 24px;
  background-color: #fff;
}
.title {
  margin: 0;
}
.blog-right {
  position: absolute;
  top: 0;
  right: 0;
  width: 240px;
  > * {
    margin-bottom: 20px;
  }
}
.directory {
  box-sizing: border-box;
  width: 240px;
  transition: top 0.2s;
}
.directory-fixed {
  position: fixed;
  top: 19px;
}
</style>
