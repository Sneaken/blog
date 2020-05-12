<template>
  <div class="list-item">
    <div class="list-item-top">
      <div>
        <span class="middle">
          <i class="el-icon-date" />
          {{ releaseTime }}
        </span>
        <span class="middle">
          <i class="el-icon-chat-dot-round" />
          {{ comments }}
        </span>
        <span class="middle">
          <i class="el-icon-time" />
          {{ estimatedReadingTime }} 分钟
        </span>
        <span class="middle">
          <i class="el-icon-edit" />
          {{ totalText }} K
        </span>
      </div>
      <h3>{{ title }}</h3>
      <p>{{ contentPreview }}</p>
      <sk-tag v-for="tag in tags" :text="tag" :key="tag"> {{ tag }}</sk-tag>
    </div>
    <div class="list-item-bottom">
      <sk-button size="small" type="primary"
        >阅读更多 <i class="el-icon-arrow-right"
      /></sk-button>
      <div>最后修改时间：{{ lastModified }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SkTag from '@/components/tag/SkTag.vue';
import SkButton from '@/components/button/SkButton.vue';
@Component({
  components: { SkButton, SkTag },
})
export default class BlogMainListItem extends Vue {
  private releaseTime = '2020-05-09';
  private comments = '1';
  private estimatedReadingTime = '22';
  private totalText = '1';
  private title = '源码分享';
  private contentPreview =
    '写在前面\n' +
    '博客源码包括两个主题icarus和next，在主题基础之上参照各网友博客，以及自己的一些想法做出的一些修改以及增加部分新元素。 以下是修改后的需要的部分配置，其余的配置参照icarus主题配置和next主题配置。\n' +
    '因为修改了原作者源码，有什么问题请先联系我，不要去麻烦原作者了，能自己解决的问题就不要麻烦别人了，每个人的时间都很宝贵。\n' +
    '膜拜和感谢所有模块的原作者,orz👻,辛苦了。';
  private tags = ['分类标签1', '分类标签2', '分类标签3', '分类标签4'];
  private lastModified = '2020-05-15';
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
  }
  .list-item {
    border: 1px solid #ebeef5;
    border-radius: 8px;
  }
  .list-item-top {
    margin: 10px;
    border-bottom: 1px solid #298dff;
    padding: 10px;
  }
  .list-item-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
  }
}
</style>
