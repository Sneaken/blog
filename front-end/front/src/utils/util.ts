import Vue from 'vue';

const inBrowser = typeof window !== 'undefined';
const inWeex =
  typeof window.WXEnvironment !== 'undefined' &&
  !!window.WXEnvironment.platform;
const weexPlatform = inWeex && window.WXEnvironment.platform.toLowerCase();
const UA = inBrowser && window.navigator.userAgent.toLowerCase();

export const isAndroid = function(): boolean {
  return (UA && UA.indexOf('android') > 0) || weexPlatform === 'android';
};
export const isIOS = function(): boolean {
  return (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === 'ios';
};

export const isMobile = function(): boolean {
  return isAndroid() || isIOS();
};

export const isIE = function(): boolean {
  return !Vue.prototype.$isServer && !isNaN(Number(document.documentMode));
};

export const isEdge = function(): boolean {
  return !Vue.prototype.$isServer && navigator.userAgent.includes('Edge');
};

export const isFirefox = function(): boolean {
  return (
    !Vue.prototype.$isServer && !!window.navigator.userAgent.match(/firefox/i)
  );
};

export const kebabCase = function(str: string): string {
  const hyphenateRE = /([^-])([A-Z])/g;
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase();
};
/* 动画的节流 */
export function rafThrottle(fn: Function) {
  let locked = false;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  return function(this: void, ...args: any) {
    if (locked) return;
    locked = true;
    window.requestAnimationFrame(() => {
      fn.apply(this, args);
      locked = false;
    });
  };
}
