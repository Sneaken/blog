<!-- 项目里 a 标签 暂时限定4种target-->
<!-- ref 这样设置 能防止钓鱼等-->
<template functional>
  <a
    class="sk-a"
    :href="props.href"
    :target="
      ['_blank', '_parent', '_self', '_top'].includes(props.target)
        ? props.target
        : '_blank'
    "
    :title="props.title"
    ref="nofollow noopener noreferrer"
  >
    <slot />
  </a>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SkA extends Vue {}
</script>

<style lang="less" scoped>
.sk-a {
  text-decoration: none;
}
</style>
