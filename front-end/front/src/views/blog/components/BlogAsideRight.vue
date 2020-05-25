<template>
  <aside class="aside-right">
    <card-article class="aside-right-card" />
    <card-comment class="aside-right-card" />
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import CardArticle from '@/views/blog/components/right/CardArticle.vue';
import CardComment from '@/views/blog/components/right/CardComment.vue';
@Component({
  components: { CardComment, CardArticle, Card },
})
export default class BlogAsideRight extends Vue {}
</script>

<style lang="less" scoped>
@media (min-width: 900px) {
  .aside-right {
    box-sizing: border-box;
    padding: 0 8vw 5vh 4vw; /* 这个组件内部只能通过这个改边距 */
  }
  .aside-right-card {
    &:first-child {
      margin-top: 15vh;
    }
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}
</style>
