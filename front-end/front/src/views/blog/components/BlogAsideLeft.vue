<template>
  <aside class="aside-left">
    <card-info class="aside-left-card" />
    <card-type class="aside-left-card" :types="types" />
    <card-tag class="aside-left-card" :tags="tags" />
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import CardInfo from '@/views/blog/components/left/CardInfo.vue';
import CardType from '@/views/blog/components/left/CardType.vue';
import CardTag from '@/views/blog/components/left/CardTag.vue';
import { getTypesAndTags } from '@/api/blog-index';
@Component({
  components: { CardTag, CardType, CardInfo, Card },
})
export default class BlogAsideLeft extends Vue {
  private tags: string[] = [];
  private types: string[] = [];
  async mounted() {
    const result = await getTypesAndTags();
    this.tags = result.tags;
    this.types = result.type;
  }
}
</script>

<style lang="less" scoped>
@media (min-width: 900px) {
  .aside-left {
    box-sizing: border-box;
    padding: 20px; /* 这个组件内部 只能通过这个改边距了 */
  }
  .aside-left-card {
    &:first-child {
      margin-top: 10vh;
    }
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}
</style>
