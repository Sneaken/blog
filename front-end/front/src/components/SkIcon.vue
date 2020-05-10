<!-- 函数式组件不能添加class-->
<!-- <sk-icon class="middle"></sk-icon>-->
<!-- 如以上类名样式不生效-->
<template functional>
  <i
    :class="['anticon', `icon-${props.icon}`]"
    :style="{
      fontSize: props.size,
      color: props.color,
    }"
  />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class SkIcon extends Vue {}
</script>
