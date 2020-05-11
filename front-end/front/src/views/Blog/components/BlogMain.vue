<template>
  <main class="main">
    <blog-main-list-item />
  </main>
</template>
v-on="$listeners"
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BlogMainListItem from '@/views/Blog/components/BlogMainListItem.vue';
@Component({
  components: { BlogMainListItem },
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
