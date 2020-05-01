<template>
  <div
    class="sk-card"
    :class="shadow ? `is-${shadow}-shadow` : 'is-always-shadow'"
  >
    <div class="sk-card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="sk-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop({ type: Object })
  private header?: {};
  @Prop({ type: Object })
  private bodyStyle?: {};
  @Prop({ type: String, default: 'never' })
  private shadow?: 'always' | 'hover' | 'never';
}
</script>

<style lang="less" scoped>
@bgc: #deeafb;
.sk-card {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  color: #303133;
  background-color: #fff;
  &:hover {
    border: 1px solid @bgc;
    background-color: @bgc;
  }
}
.sk-card.is-always-shadow,
.sk-card.is-hover-shadow:focus,
.sk-card.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
}
.sk-card__header {
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
  padding: 18px 20px;
}
.sk-card__body {
  padding: 20px;
}
</style>
