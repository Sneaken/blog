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
            <svg
              class="icon"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
            >
              <path
                d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"
              ></path>
            </svg>
          </sk-a>
        </li>
        <li class="level-item icon">
          <sk-a href="https://user.qzone.qq.com/924393527" title="QQ空间">
            <svg
              class="icon"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
            >
              <path
                d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z"
              ></path>
            </svg>
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
    }
  }
}
.english {
  color: #298dff;
  font-family: 'Arial', 'Microsoft YaHei', '黑体', '宋体', sans-serif;
}
</style>
