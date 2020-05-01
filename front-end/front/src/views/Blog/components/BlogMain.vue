<template>
  <main class="main"></main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SkIcon from '@/components/SkIcon.vue';
@Component({
  components: { SkIcon },
})
export default class BlogMain extends Vue {}
</script>

<style lang="less" scoped>
.main {
  margin-top: 3vh;
  padding: 3vw;
  background-color: #fff;
}
</style>
