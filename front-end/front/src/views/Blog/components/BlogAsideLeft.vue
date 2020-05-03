<template>
  <aside class="aside-left">
    <card-info class="aside-left-card" />
    <card-type class="aside-left-card" />
    <card-tag class="aside-left-card" />
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import CardInfo from '@/views/Blog/components/left/CardInfo.vue';
import CardType from '@/views/Blog/components/left/CardType.vue';
import CardTag from '@/views/Blog/components/left/CardTag.vue';
@Component({
  components: { CardTag, CardType, CardInfo, Card },
})
export default class BlogAsideLeft extends Vue {}
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
