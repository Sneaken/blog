<template>
  <footer class="blog-footer">
    <div>
      <p class="no-margin" v-pre>© 2020 Sneaker | Use Vue</p>
      <p v-pre>
        © 版权说明：[本网站所有内容均收集于互联网或自己创作,
        方便网友与自己学习交流，如有侵权，请留言，立即处理]
      </p>
      <p>❤️本站自 {{ startTimeString }} 已运行 {{ runTime }}！❤️</p>
      <p class="no-margin" v-show="views">
        ❤️感谢 {{ persons }} 位小伙伴的 {{ views }} 次光临！❤️
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { time2day } from '@/utils/time';
import { getVisits } from '@/api/blog-index';

@Component
export default class BlogFooter extends Vue {
  private startTime: Date = new Date('2020-04-27 14:10:00');
  private persons = 0;
  private views = 0;
  private time = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  private get startTimeString(): string {
    return time2day(this.startTime);
  }
  private get hoursString(): string | number {
    return this.time.hours < 10 ? `0${this.time.hours}` : this.time.hours;
  }
  private get minutesString(): string | number {
    return this.time.minutes < 10 ? `0${this.time.minutes}` : this.time.minutes;
  }
  private get secondsString(): string | number {
    return this.time.seconds < 10 ? `0${this.time.seconds}` : this.time.seconds;
  }
  private get runTime(): string {
    return `${this.time.days} 天 ${this.hoursString} 小时 ${this.minutesString} 分 ${this.secondsString} 秒`;
  }

  private mounted() {
    this.calcTime();
    const timer = setInterval(() => {
      this.runInterval();
    }, 1000);
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer);
    });
    this.getVisits();
  }
  private async getVisits() {
    try {
      const result = await getVisits();
      this.persons = result.visitors;
      this.views = result.views;
    } catch (e) {
      this.persons = 0;
      this.views = 0;
      console.log(e);
    }
  }
  private calcTime() {
    const difference = Date.now() - this.startTime.getTime();
    this.time.days = (difference / 24 / 3600 / 1000) | 0;
    this.time.hours = (difference / 3600 / 1000 - this.time.days * 24) | 0;
    this.time.minutes =
      (difference / 60 / 1000 -
        this.time.days * 24 * 60 -
        this.time.hours * 60) |
      0;
    this.time.seconds =
      (difference / 1000 -
        this.time.days * 24 * 3600 -
        this.time.hours * 3600 -
        this.time.minutes * 60) |
      0;
  }

  private runInterval() {
    if (this.time.seconds++ == 59) {
      this.time.minutes++;
      this.time.seconds = 0;
    }
    if (this.time.minutes == 59) {
      this.time.hours++;
      this.time.minutes = 0;
    }
    if (this.time.hours == 23) {
      this.time.days++;
      this.time.hours = 0;
    }
  }
}
</script>

<style lang="less" scoped>
.blog-footer {
  text-align: center;
  line-height: normal;

  color: #e2dcdc;
  background: url('http://images.jasonpang.top/bg.jpg') no-repeat fixed center
    center;
  background-size: cover;

  .no-margin {
    margin: 0;
  }
}
</style>
