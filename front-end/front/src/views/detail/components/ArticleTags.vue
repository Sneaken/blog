<template>
  <card shadow="hover">
    <template #header>
      标签
    </template>
    <div>
      <sk-tag v-for="item in tags" :key="item"> {{ item }}</sk-tag>
    </div>
  </card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import SkTag from '@/components/tag/SkTag.vue';
@Component({
  components: { SkTag, Card },
})
export default class ArticleTags extends Vue {
  @Prop(Array) private readonly tags!: string[];
}
</script>

<style lang="less" scoped></style>
