<template>
  <card shadow="hover">
    <template #header>
      分类
    </template>
  </card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
@Component({
  components: { Card },
})
export default class CardType extends Vue {}
</script>

<style lang="less" scoped></style>
