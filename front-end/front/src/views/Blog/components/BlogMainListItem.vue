<template>
  <div class="list-item">
    <div class="list-item-top">
      <div>
        <span class="middle">
          <sk-icon icon="calendar" size="14px" />
          发布时间
        </span>
        <span class="middle">
          <sk-icon icon="message1" size="14px" />
          评论数
        </span>
        <span class="middle">
          <sk-icon icon="clockcircleo" size="14px" />
          预计阅读时长
        </span>
        <span class="middle">
          <sk-icon icon="edit" size="14px" />
          文字总数
        </span>
      </div>
      <h3>title</h3>
      <p>内容</p>
      <div>分类标签</div>
    </div>
    <div class="list-item-bottom">
      <div>阅读更多</div>
      <div>最后修改时间：xxxx-xx-xx</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SkIcon from '@/components/SkIcon.vue';
@Component({
  components: { SkIcon },
})
export default class BlogMainListItem extends Vue {}
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
