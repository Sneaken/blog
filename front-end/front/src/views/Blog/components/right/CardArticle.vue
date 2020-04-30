<template>
  <card shadow="always">
    <template #header>
      最新文章
    </template>
  </card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
@Component({
  components: { Card },
})
export default class CardArticle extends Vue {}
</script>

<style lang="less" scoped></style>
