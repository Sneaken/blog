// we must force tsc to interpret this file as a module
export {}; // 此行没啥什么实际意义 只是为了取消报错。

declare global {
  interface Window {
    WXEnvironment: any; // 微信环境
  }
  interface Document {
    documentMode?: number; // ie 存在此值
  }
  interface Element {
    /* CompatibleIE-兼容ie-start */
    attachEvent<K extends keyof ElementEventMap>(
      type: K,
      listener: (this: Element, ev: ElementEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions,
    ): void;
    attachEvent(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions,
    ): void;
    detachEvent<K extends keyof ElementEventMap>(
      type: K,
      listener: (this: Element, ev: ElementEventMap[K]) => any,
      options?: boolean | EventListenerOptions,
    ): void;
    detachEvent(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | EventListenerOptions,
    ): void;
    /* CompatibleIE-兼容ie-end */
    target: any;
  }
  interface WheelEvent {
    wheelDelta?: number;
  }
}
