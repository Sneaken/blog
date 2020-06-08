<template>
  <card shadow="hover">
    <template #header>
      标签
    </template>
    <sk-tag v-for="item in tags" :key="item">{{ item }}</sk-tag>
  </card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import SkTag from '@/components/tag/SkTag.vue';
@Component({
  components: { SkTag, Card },
})
export default class CardTag extends Vue {
  @Prop({ type: Array, required: true })
  private readonly tags!: string[];
}
</script>

<style lang="less" scoped></style>
