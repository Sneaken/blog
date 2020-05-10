<template>
  <transition name="viewer-fade">
    <div
      tabindex="-1"
      ref="sk-image-viewer__wrapper"
      class="sk-image-viewer__wrapper"
      v-if="isShow"
      :style="{ 'z-index': zIndex }"
    >
      <div class="sk-image-viewer__mask"></div>
      <!-- CLOSE -->
      <span class="sk-image-viewer__btn sk-image-viewer__close" @click="hide">
        <i class="anticon icon-closecircleo"></i>
      </span>
      <!-- ARROW -->
      <template v-if="!isSingle">
        <span
          class="sk-image-viewer__btn sk-image-viewer__prev"
          :class="{ 'is-disabled': !infinite && isFirst }"
          @click="prev"
        >
          <i class="anticon icon-leftcircle" />
        </span>
        <span
          class="sk-image-viewer__btn sk-image-viewer__next"
          :class="{ 'is-disabled': !infinite && isLast }"
          @click="next"
        >
          <i class="anticon icon-rightcircle" />
        </span>
      </template>
      <!-- ACTIONS -->
      <div class="sk-image-viewer__btn sk-image-viewer__actions">
        <div class="sk-image-viewer__actions__inner">
          <i
            class="anticon icon-minuscircleo"
            @click="handleActions('zoomOut')"
          ></i>
          <i
            class="anticon icon-pluscircleo"
            @click="handleActions('zoomIn')"
          ></i>
          <i class="sk-image-viewer__actions__divider"></i>
          <i :class="mode.icon" @click="toggleMode"></i>
          <i class="sk-image-viewer__actions__divider"></i>
          <i
            class="anticon icon-reload1 reload2"
            @click="handleActions('anticlocelise')"
          ></i>
          <i
            class="anticon icon-reload1"
            @click="handleActions('clocelise')"
          ></i>
        </div>
      </div>
      <!-- CANVAS -->
      <div class="sk-image-viewer__canvas">
        <template v-for="(url, i) in urlList">
          <img
            v-if="i === index"
            ref="img"
            class="sk-image-viewer__img"
            :key="url"
            :src="currentImg"
            :style="imgStyle"
            @load="handleImgLoad"
            @error="handleImgError"
            @mousedown="handleMouseDown"
          />
        </template>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { isFirefox, rafThrottle } from '@/utils/util';
import { off, on } from '@/utils/dom';
import { dar, dfn } from '@/utils/other';

interface StyleInterface {
  transform: string;
  transition: string;
  'margin-left': string;
  'margin-top': string;
  maxWidth?: string;
  maxHeight?: string;
}
type Action = 'zoomOut' | 'zoomIn' | 'clocelise' | 'anticlocelise';

const Mode = {
  CONTAIN: {
    name: 'contain',
    icon: 'anticon icon-arrowsalt',
  },
  ORIGINAL: {
    name: 'original',
    icon: 'anticon icon-shrink',
  },
};

const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel';

@Component
export default class SkImageViewer extends Vue {
  @Prop({ type: Array, default: dar })
  private readonly urlList!: string[];
  @Prop({ type: Number, default: 2000 })
  private readonly zIndex!: number;
  @Prop({ type: Function, default: dfn })
  private readonly onSwitch!: (val: number) => {};
  @Prop({ type: Function, default: dfn })
  private readonly onClose!: () => {};
  @Prop({ type: Number, default: 0 })
  private readonly initialIndex!: number;
  @Prop({ type: Boolean, default: false })
  private readonly isShow!: boolean;

  private index = this.initialIndex;
  private infinite = true;
  private loading = false;
  private mode = Mode.CONTAIN;
  private transform = {
    scale: 1,
    deg: 0,
    offsetX: 0,
    offsetY: 0,
    enableTransition: false,
  };

  private _keyDownHandler!: EventListenerOrEventListenerObject | null;
  private _mouseWheelHandler!: EventListenerOrEventListenerObject | null;
  private _dragHandler!: EventListenerOrEventListenerObject | null;

  private get isSingle(): boolean {
    return this.urlList.length <= 1;
  }
  private get isFirst(): boolean {
    return this.index === 0;
  }
  private get isLast(): boolean {
    return this.index === this.urlList.length - 1;
  }
  private get currentImg(): string {
    return this.urlList[this.index];
  }
  private get imgStyle() {
    const { scale, deg, offsetX, offsetY, enableTransition } = this.transform;
    const style: StyleInterface = {
      transform: `scale(${scale}) rotate(${deg}deg)`,
      transition: enableTransition ? 'transform .3s' : '',
      'margin-left': `${offsetX}px`,
      'margin-top': `${offsetY}px`,
    };
    if (this.mode === Mode.CONTAIN) {
      style.maxWidth = style.maxHeight = '100%';
    }
    return style;
  }

  @Watch('index')
  indexChange(val: number) {
    this.reset();
    this.onSwitch(val);
  }
  @Watch('currentImg')
  currentImgChange() {
    this.$nextTick(() => {
      const $img = (this.$refs.img as HTMLImageElement[])[0];
      if (!$img.complete) {
        this.loading = true;
      }
    });
  }
  @Watch('isShow')
  async isShowChange(val: boolean) {
    // add tabindex then wrapper can be focusable via Javascript
    // focus wrapper so arrow key can't cause inner scroll behavior underneath
    await this.$nextTick();
    if (val) {
      this.deviceSupportInstall();
      (this.$refs['sk-image-viewer__wrapper'] as HTMLDivElement).focus();
    }
  }

  hide() {
    this.deviceSupportUninstall();
    this.onClose();
  }
  deviceSupportInstall() {
    // 按键事件
    this._keyDownHandler = rafThrottle((e: KeyboardEvent) => {
      // IE全系列不支持code keyCode全系列支持但不推荐使用
      const keyCode = e.code || e.keyCode;
      switch (keyCode) {
        // ESC
        case 'Escape':
        case 27:
          this.hide();
          break;
        // SPACE
        case 'Space':
        case 32:
          this.toggleMode();
          break;
        // LEFT_ARROW
        case 'ArrowLeft':
        case 37:
          this.prev();
          break;
        // UP_ARROW
        case 'ArrowUp':
        case 38:
          this.handleActions('zoomIn');
          break;
        // RIGHT_ARROW
        case 'ArrowRight':
        case 39:
          this.next();
          break;
        // DOWN_ARROW
        case 'ArrowDown':
        case 40:
          this.handleActions('zoomOut');
          break;
      }
    });
    // 鼠标滚轮事件
    this._mouseWheelHandler = rafThrottle((e: WheelEvent) => {
      const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
      if (delta > 0) {
        this.handleActions('zoomIn', {
          zoomRate: 0.015,
          enableTransition: false,
        });
      } else {
        this.handleActions('zoomOut', {
          zoomRate: 0.015,
          enableTransition: false,
        });
      }
    });
    on(document, 'keydown', this._keyDownHandler);
    on(document, mousewheelEventName, this._mouseWheelHandler);
  }
  deviceSupportUninstall() {
    off(
      document,
      'keydown',
      this._keyDownHandler as EventListenerOrEventListenerObject,
    );
    off(
      document,
      mousewheelEventName,
      this._mouseWheelHandler as EventListenerOrEventListenerObject,
    );
    this._keyDownHandler = null;
    this._mouseWheelHandler = null;
  }
  handleImgLoad() {
    this.loading = false;
  }
  handleImgError(e: Event) {
    this.loading = false;
    (e.target as HTMLImageElement).alt = '加载失败';
  }
  handleMouseDown(e: MouseEvent) {
    if (this.loading || e.button !== 0) return;

    const { offsetX, offsetY } = this.transform;
    const startX = e.pageX;
    const startY = e.pageY;
    this._dragHandler = rafThrottle((ev: MouseEvent) => {
      this.transform.offsetX = offsetX + ev.pageX - startX;
      this.transform.offsetY = offsetY + ev.pageY - startY;
    });
    on(document, 'mousemove', this._dragHandler);
    on(document, 'mouseup', () => {
      off(
        document,
        'mousemove',
        this._dragHandler as EventListenerOrEventListenerObject,
      );
    });

    e.preventDefault();
  }
  reset() {
    this.transform = {
      scale: 1,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      enableTransition: false,
    };
  }
  toggleMode() {
    if (this.loading) return;

    const modeNames = Object.keys(Mode);
    const modeValues = Object.values(Mode);
    const index = modeValues.indexOf(this.mode);
    const nextIndex = (index + 1) % modeNames.length;
    // @ts-ignore
    this.mode = Mode[modeNames[nextIndex]];
    this.reset();
  }
  prev() {
    if (this.isFirst && !this.infinite) return;
    const len = this.urlList.length;
    this.index = (this.index - 1 + len) % len;
  }
  next() {
    if (this.isLast && !this.infinite) return;
    const len = this.urlList.length;
    this.index = (this.index + 1) % len;
  }
  handleActions(action: Action, options = {}) {
    if (this.loading) return;
    const { zoomRate, rotateDeg, enableTransition } = {
      zoomRate: 0.2,
      rotateDeg: 90,
      enableTransition: true,
      ...options,
    };
    const { transform } = this;
    switch (action) {
      case 'zoomOut':
        if (transform.scale > 0.2) {
          transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3));
        }
        break;
      case 'zoomIn':
        transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
        break;
      case 'clocelise':
        transform.deg += rotateDeg;
        break;
      case 'anticlocelise':
        transform.deg -= rotateDeg;
        break;
    }
    transform.enableTransition = enableTransition;
  }
}
</script>

<style lang="less" scoped>
@media all {
  .anticon {
    font-size: 23px;
  }
  .reload2 {
    transform: rotateY(180deg);
  }
  .sk-image-viewer__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .sk-image-viewer__btn {
    display: flex;
    position: absolute;
    z-index: 1;
    box-sizing: border-box;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
    cursor: pointer;
    user-select: none;
  }
  .sk-image-viewer__close {
    top: 40px;
    right: 40px;
    width: 40px;
    height: 40px;
    font-size: 40px;
    .icon-closecircleo {
      font-size: 40px;
    }
  }
  .sk-image-viewer__canvas {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sk-image-viewer__actions {
    left: 50%;
    bottom: 30px;
    border-color: #fff;
    border-radius: 22px;
    padding: 0 23px;
    width: 282px;
    height: 44px;
    background-color: #606266;
    transform: translateX(-50%);
  }
  .sk-image-viewer__actions__inner {
    display: flex;
    width: 100%;
    height: 100%;
    text-align: justify;
    font-size: 23px;
    color: #fff;
    align-items: center;
    justify-content: space-around;
    cursor: default;
  }
  .sk-image-viewer__next,
  .sk-image-viewer__prev {
    top: 50%;
    border-color: #fff;
    width: 44px;
    height: 44px;
    font-size: 24px;
    color: #fff;
    background-color: #606266;
  }
  .sk-image-viewer__prev {
    left: 40px;
    transform: translateY(-50%);
    .icon-leftcircle {
      font-size: 44px;
    }
  }
  .sk-image-viewer__next {
    right: 40px;
    text-indent: 2px;
    transform: translateY(-50%);
    .icon-rightcircle {
      font-size: 44px;
    }
  }
  .sk-image-viewer__mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
  }
  .viewer-fade-enter-active {
    animation: viewer-fade-in 0.3s;
  }
  .viewer-fade-leave-active {
    animation: viewer-fade-out 0.3s;
  }
  @keyframes viewer-fade-in {
    0% {
      transform: translate3d(0, -20px, 0);
      opacity: 0;
    }
    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
  @keyframes viewer-fade-out {
    0% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    100% {
      transform: translate3d(0, -20px, 0);
      opacity: 0;
    }
  }
}
</style>
