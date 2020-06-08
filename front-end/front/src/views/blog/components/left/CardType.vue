<template>
  <card shadow="hover">
    <template #header>
      分类
    </template>
    <sk-tag v-for="item in types" :key="item">{{ item }}</sk-tag>
  </card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import SkTag from '@/components/tag/SkTag.vue';
@Component({
  components: { SkTag, Card },
})
export default class CardType extends Vue {
  @Prop({ type: Array, required: true })
  private readonly types!: string[];
}
</script>

<style lang="less" scoped></style>
