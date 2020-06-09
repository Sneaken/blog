<template>
  <div id="app">
    <keep-alive exclude="DetailPage">
      <router-view />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { reportVisit } from '@/api/report';

@Component
export default class App extends Vue {
  async beforeMount() {
    try {
      await reportVisit();
    } catch (e) {
      console.log(e);
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: 'Microsoft YaHei', 'SF Pro Display', Roboto, Noto, Arial,
    'PingFang SC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
