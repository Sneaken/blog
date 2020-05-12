<template>
  <transition name="el-fade-in">
    <div
      class="el-back-top"
      v-if="visible"
      @click.stop="handleClick"
      :style="{
        right: styleRight,
        bottom: styleBottom,
      }"
    >
      <slot>
        <i class="el-icon-caret-top" />
      </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { throttle } from '@/utils/throttle-debounce';
import { off, on } from '@/utils/dom';

const cubic = (value: number) => value ** 3;
const easeInOutCubic = (value: number) =>
  value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;

@Component
export default class SkBackTop extends Vue {
  @Prop({ type: Number, default: 200 })
  private readonly visibilityHeight!: number;
  /* 触发滚动的对象 */
  @Prop({ type: [String] })
  private readonly target?: string;
  @Prop({ type: Number, default: 40 })
  private readonly right!: number;
  @Prop({ type: Number, default: 40 })
  private readonly bottom!: number;

  private el: Element | null = null;
  private container: Document | Element | null = null;
  private visible = false;

  private _throttledScrollHandler: EventListenerOrEventListenerObject | null = null;

  private get styleBottom(): string {
    return `${this.bottom}px`;
  }
  private get styleRight(): string {
    return `${this.right}px`;
  }

  mounted() {
    this.init();
    /* 检查当前是否需要显示 */
    /* 有可能打开页面的时候处于网页中部 */
    this.onScroll();
    this._throttledScrollHandler = throttle(300, this.onScroll);
    on(this.container as Element, 'scroll', this._throttledScrollHandler);
    this.$once('hook:beforeDestroy', () => {
      off(
        this.container as Element,
        'scroll',
        this._throttledScrollHandler as EventListenerOrEventListenerObject,
      );
    });
  }

  init() {
    this.container = document;
    this.el = document.documentElement;
    if (this.target) {
      this.el = document.querySelector(this.target);
      if (!this.el) {
        throw new Error(`target is not existed: ${this.target}`);
      }
      this.container = this.el;
    }
  }

  onScroll() {
    const scrollTop = (this.el as Element).scrollTop;
    this.visible = scrollTop >= this.visibilityHeight;
  }

  @Emit('click')
  handleClick() {
    this.scrollToTop();
  }

  scrollToTop() {
    const el = this.el;
    const beginTime = Date.now();
    const beginValue = (el as Element).scrollTop;
    const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
    const frameFunc = () => {
      const progress = (Date.now() - beginTime) / 500;
      if (progress < 1) {
        (el as Element).scrollTop = beginValue * (1 - easeInOutCubic(progress));
        rAF(frameFunc);
      } else {
        (el as Element).scrollTop = 0;
      }
    };
    rAF(frameFunc);
  }
}
</script>

<style lang="less" scoped>
.el-back-top {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;

  position: fixed;

  border-radius: 50%;

  color: #409eff;
  background-color: #fff;

  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  &:hover {
    background-color: #f2f6fc;
  }
}
@media all {
  .el-back-top {
    width: 40px;
    height: 40px;

    font-size: 20px;
  }
}
</style>
