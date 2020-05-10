<template>
  <div class="sk-image">
    <slot v-if="loading" name="placeholder">
      <div class="sk-image__placeholder" />
    </slot>
    <slot v-else-if="error" name="error">
      <div class="sk-image__error">加载失败</div>
    </slot>
    <img
      v-else
      class="sk-image__inner"
      v-bind="$attrs"
      v-on="$listeners"
      @click="clickHandler"
      :src="src"
      :style="imageStyle"
      :class="{
        'sk-image__inner--center': alignCenter,
        'sk-image__preview': preview,
      }"
    />
    <template v-if="preview">
      <sk-image-viewer
        :z-index="zIndex"
        :initial-index="imageIndex"
        :is-show="showViewer"
        :on-close="closeViewer"
        :url-list="previewSrcList"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { isHtmlElement, isString } from '@/utils/types';
import { getScrollContainer, isInContainer, off, on } from '@/utils/dom';
import { throttle } from '@/utils/throttle-debounce';
import { dar } from '@/utils/other';
import SkImageViewer from '@/components/image/SkImageViewer.vue';

// 比如ie就不支持
const isSupportObjectFit = () =>
  typeof document.documentElement.style.objectFit !== 'undefined';

const ObjectFit = {
  NONE: 'none',
  CONTAIN: 'contain',
  COVER: 'cover',
  FILL: 'fill',
  SCALE_DOWN: 'scale-down',
};

let prevOverflow = '';

@Component({
  components: { SkImageViewer },
  inheritAttrs: false, // 此时组件将不会把未被注册的props呈现为普通的HTML属性
})
export default class SkImage extends Vue {
  @Prop({ type: String })
  private readonly src!: string;
  @Prop({ type: String })
  private readonly fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  @Prop({ type: Boolean })
  private readonly lazy?: boolean;
  @Prop({ type: String || Object })
  private readonly scrollContainer?: string | Element; // 开启懒加载后，监听 scroll 事件的容器
  @Prop({ type: Array, default: dar })
  private readonly previewSrcList!: string[]; // 图片预览的数组列表 单图 传入src即可
  @Prop({ type: Number, default: 2000 })
  private readonly zIndex!: number; // 设置图片预览的 z-index

  private loading = true;
  private error = false;
  private show = !this.lazy;
  private imageWidth = 0;
  private imageHeight = 0;
  private showViewer = false;

  // vue中不会监听 以下划线开头的数据 同时无法直接初始化
  private _scrollContainer?: string | Element | null;
  private _lazyLoadHandler?: EventListenerOrEventListenerObject | null;

  private get imageStyle() {
    const { fit } = this;
    if (!this.$isServer && fit) {
      return isSupportObjectFit()
        ? { 'object-fit': fit }
        : this.getImageStyle(fit);
    }
    return {};
  }
  private get alignCenter(): boolean {
    return (
      !this.$isServer && !isSupportObjectFit() && this.fit !== ObjectFit.FILL
    );
  }
  private get preview(): boolean {
    const { previewSrcList } = this;
    return Array.isArray(previewSrcList) && previewSrcList.length > 0;
  }
  private get imageIndex(): number {
    let previewIndex = 0;
    const srcIndex = this.previewSrcList.indexOf(this.src);
    if (srcIndex >= 0) {
      previewIndex = srcIndex;
    }
    return previewIndex;
  }
  @Watch('src')
  srcChange() {
    this.show && this.loadImage();
  }
  @Watch('show')
  showChange(val: boolean) {
    // 懒加载相关
    val && this.loadImage();
  }

  mounted() {
    if (this.lazy) {
      this.addLazyLoadListener();
    } else {
      this.loadImage();
    }
  }
  beforeDestroy() {
    this.lazy && this.removeLazyLoadListener();
  }

  loadImage() {
    if (this.$isServer) return;

    // reset status
    this.loading = true;
    this.error = false;

    const img = new Image();
    img.onload = e => this.handleLoad(e, img);
    img.onerror = this.handleError;

    // bind html attrs
    // so it can behave consistently
    Object.keys(this.$attrs).forEach(key => {
      const value = this.$attrs[key];
      img.setAttribute(key, value);
    });
    img.src = this.src;
  }
  handleLoad(e: Event, img: HTMLImageElement) {
    this.imageWidth = img.width;
    this.imageHeight = img.height;
    this.loading = false;
  }
  handleError() {
    this.loading = false;
    this.error = true;
  }
  addLazyLoadListener() {
    if (this.$isServer) return;

    const { scrollContainer } = this;
    let _scrollContainer = null;

    if (isHtmlElement(scrollContainer as Node)) {
      _scrollContainer = scrollContainer;
    } else if (isString(scrollContainer)) {
      _scrollContainer = document.querySelector(scrollContainer as string);
    } else {
      _scrollContainer = getScrollContainer(this.$el);
    }

    if (_scrollContainer) {
      this._scrollContainer = _scrollContainer as never;
      this._lazyLoadHandler = throttle(200, this.handleLazyLoad);
      on(_scrollContainer as never, 'scroll', this._lazyLoadHandler);
      this.handleLazyLoad();
    }
  }
  handleLazyLoad() {
    if (isInContainer(this.$el, this._scrollContainer as HTMLElement)) {
      this.show = true;
      this.removeLazyLoadListener();
    }
  }
  removeLazyLoadListener() {
    const { _scrollContainer, _lazyLoadHandler } = this;

    if (this.$isServer || !_scrollContainer || !_lazyLoadHandler) return;

    off(_scrollContainer as never, 'scroll', _lazyLoadHandler);
    this._scrollContainer = null;
    this._lazyLoadHandler = null;
  }
  /**
   * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
   */
  getImageStyle(fit: string) {
    const { imageWidth, imageHeight } = this;
    const {
      clientWidth: containerWidth,
      clientHeight: containerHeight,
    } = this.$el;

    if (!imageWidth || !imageHeight || !containerWidth || !containerHeight)
      return {};

    const vertical = imageWidth / imageHeight < 1;

    if (fit === ObjectFit.SCALE_DOWN) {
      const isSmaller =
        imageWidth < containerWidth && imageHeight < containerHeight;
      fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN;
    }

    switch (fit) {
      case ObjectFit.NONE:
        return { width: 'auto', height: 'auto' };
      case ObjectFit.CONTAIN:
        return vertical ? { width: 'auto' } : { height: 'auto' };
      case ObjectFit.COVER:
        return vertical ? { height: 'auto' } : { width: 'auto' };
      default:
        return {};
    }
  }
  clickHandler() {
    // don't show viewer when preview is false
    if (!this.preview) {
      return;
    }
    // prevent body scroll
    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.showViewer = true;
  }
  closeViewer() {
    document.body.style.overflow = prevOverflow;
    this.showViewer = false;
  }
}
</script>

<style lang="less" scoped>
@media all {
  .sk-image__error,
  .sk-image__placeholder {
    background: #f5f7fa;
  }
  .sk-image__error,
  .sk-image__inner,
  .sk-image__placeholder {
    width: 100%;
    height: 100%;
  }
  .sk-image {
    position: relative;
    display: inline-block;
    overflow: hidden;
  }
  .sk-image__inner {
    vertical-align: top;
  }
  .sk-image__inner--center {
    display: block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .sk-image__error {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #c0c4cc;
    vertical-align: middle;
  }
  .sk-image__preview {
    cursor: pointer;
  }
}
</style>
