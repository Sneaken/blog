<template>
  <div class="list-item">
    <div class="list-item-top">
      <div>
        <span class="middle">
          <sk-icon icon="calendar" size="14px" />
          {{ releaseTime }}
        </span>
        <span class="middle">
          <sk-icon icon="message1" size="14px" />
          {{ comments }}
        </span>
        <span class="middle">
          <sk-icon icon="clockcircleo" size="14px" />
          {{ estimatedReadingTime }} 分钟
        </span>
        <span class="middle">
          <sk-icon icon="edit" size="14px" />
          {{ totalText }} K
        </span>
      </div>
      <h3>{{ title }}</h3>
      <p>{{ contentPreview }}</p>
      <sk-tag v-for="tag in tags" :text="tag" :key="tag"> {{ tag }}</sk-tag>
    </div>
    <div class="list-item-bottom">
      <div>阅读更多</div>
      <div>最后修改时间：{{ lastModified }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SkIcon from '@/components/SkIcon.vue';
import SkTag from '@/components/tag/SkTag.vue';
@Component({
  components: { SkTag, SkIcon },
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
.middle {
  vertical-align: middle;
}
@media (min-width: 900px) {
  .list-item {
    border: 1px solid #ebeef5;
    border-radius: 4px;
  }
  .list-item-top {
    margin: 10px;
    border-bottom: 1px solid #298dff;
    padding: 10px;
  }
  .list-item-bottom {
    display: flex;
    justify-content: space-between;
    padding: 15px;
  }
}
</style>
