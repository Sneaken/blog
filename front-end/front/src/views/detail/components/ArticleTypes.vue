<template>
  <card shadow="hover">
    <template #header>
      标签
    </template>
    <div>
      <sk-tag v-for="item in types" :key="item"> {{ item }}</sk-tag>
    </div>
  </card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SkTag from '@/components/tag/SkTag.vue';
import Card from '@/components/Card.vue';
@Component({
  components: { Card, SkTag },
})
export default class ArticleTypes extends Vue {
  @Prop(Array) private readonly types!: string[];
}
</script>

<style lang="less" scoped></style>
