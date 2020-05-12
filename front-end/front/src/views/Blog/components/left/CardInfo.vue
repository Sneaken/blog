<template>
  <card
    class="center"
    shadow="hover"
    :body-style="{
      padding: quotation.chinese ? '20px' : 0,
    }"
  >
    <template #header>
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
      <ul class="level">
        <li class="level-item icon">
          <sk-a href="https://github.com/Sneaken" title="github">
            <i class="icon-github"></i>
          </sk-a>
        </li>
        <li class="level-item icon">
          <sk-a href="https://user.qzone.qq.com/924393527" title="QQ空间">
            <i class="icon-QQ" />
          </sk-a>
        </li>
      </ul>
    </template>
    <div v-if="quotation.chinese">
      <p class="english">{{ quotation.english }}</p>
      <p @click="handleQuotation">{{ quotation.chinese }}</p>
    </div>
  </card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import SkA from '@/components/SkA.vue';
import { getQuotation } from '@/api/blog-index';

@Component({
  components: { SkA, Card },
})
export default class CardInfo extends Vue {
  private article = 0;
  private types = 0;
  private tags = 0;
  private quotation: Quotation = {
    english: '',
    chinese: '',
  };
  mounted() {
    this.handleQuotation();
  }
  async handleQuotation() {
    try {
      this.quotation = await getQuotation();
    } catch (e) {
      console.error(e.message);
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  .avatar-img {
    border-radius: 50%;
    height: 30px;
    width: 30px;
    transition: all 0.5s ease-in;
    &:hover {
      transform: rotate(360deg);
    }
  }
}
@media (min-width: 900px) {
  .avatar {
    .avatar-img {
      height: 150px;
      width: 150px;
    }
  }
}
.level {
  list-style-type: none;
  margin: 0;
  padding: 0;
  &:not(:last-child) {
    margin-bottom: 5px;
  }
  .level-item {
    display: inline-block;
    margin: 0 20px;
  }
  .level-item-number {
    font-size: 50px;
    font-weight: bolder;
  }
  .icon {
    margin: 0 10px;
    font-size: 10px;
  }
}
@media (min-width: 900px) {
  .level {
    .level-item {
      margin: 0 20px;
    }
    &:not(:last-child) {
      margin-bottom: 5px;
    }
    .level-item-number {
      font-size: 50px;
      font-weight: bolder;
    }
    .icon {
      margin: 0 10px;
      font-size: 10px;
    }
  }
}
.english {
  color: #298dff;
  font-family: 'Arial', 'Microsoft YaHei', '黑体', '宋体', sans-serif;
}
</style>
