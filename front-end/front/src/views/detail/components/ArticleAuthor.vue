<template>
  <card shadow="hover">
    <template #header>
      关于作者
    </template>
    <div class="author item" @click="handleClick">
      <sk-image class="avatar" :src="require('@/assets/images/avatar.jpg')" />
      <div class="username">Sneaker</div>
    </div>
    <div class="stat-item item">
      <svg class="stat-view-icon" width="25" height="25" viewBox="0 0 25 25">
        <g fill="none" fill-rule="evenodd">
          <circle cx="12.5" cy="12.5" r="12.5" fill="#E1EFFF"></circle>
          <path
            fill="#7BB9FF"
            d="M4 12.5S6.917 7 12.75 7s8.75 5.5 8.75 5.5-2.917 5.5-8.75 5.5S4 12.5 4 12.5zm8.75 2.292c1.208 0 2.188-1.026 2.188-2.292 0-1.266-.98-2.292-2.188-2.292-1.208 0-2.188 1.026-2.188 2.292 0 1.266.98 2.292 2.188 2.292z"
          ></path>
        </g>
      </svg>
      <span
        >文章被阅读<span class="count">{{ viewsTotal }}</span></span
      >
    </div>
  </card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import SkImage from '@/components/image/SkImage.vue';
@Component({
  components: { SkImage, Card },
})
export default class ArticleAuthor extends Vue {
  private viewsTotal = 0;

  handleClick() {
    this.$router.push('/');
  }
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  align-items: center;
}
.author {
  margin-bottom: 15px;
}
.username {
  padding: 10px;
  font-weight: 600;
}
.avatar {
  width: 30%;
  border-radius: 50%;
}
.stat-item {
  padding: 0 5px;
}
.stat-view-icon {
  flex: 0 0 auto;
  margin-right: 10px;
}
.count {
  margin: 0 0.3em;
  font-weight: 500;
}
</style>
