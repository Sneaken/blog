<template>
  <card class="center" shadow="hover">
    <div class="avatar">
      <img
        class="avatar-img"
        src="~@/assets/images/avatar.jpg"
        alt="头像"
        height="100"
        width="100"
      />
    </div>
    <p>Sneaker</p>
    <p>学习如逆水行舟，不进则退。</p>
    <ul class="level">
      <li class="level-item">
        <p>文章</p>
        <span class="level-item-number">{{ article }}</span>
      </li>
      <li class="level-item">
        <p>分类</p>
        <span class="level-item-number">{{ types }}</span>
      </li>
      <li class="level-item">
        <p>标签</p>
        <span class="level-item-number">{{ tags }}</span>
      </li>
    </ul>
  </card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import SkIcon from '@/components/SkIcon.vue';
@Component({
  components: { SkIcon, Card },
})
export default class CardInfo extends Vue {
  private article = 0;
  private types = 0;
  private tags = 0;
}
</script>

<style lang="less" scoped>
.avatar {
  .avatar-img {
    border-radius: 50%;
    height: 150px;
    width: 150px;
    transition: all 0.5s ease-in;
    &:hover {
      transform: rotate(360deg);
    }
  }
}
.level {
  list-style-type: none;
  margin: 0;
  padding: 0;
  .level-item {
    display: inline-block;
    margin: 0 20px;
  }
  .level-item-number {
    font-size: 50px;
    font-weight: bolder;
  }
}
</style>
