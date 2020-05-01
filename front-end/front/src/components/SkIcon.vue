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
