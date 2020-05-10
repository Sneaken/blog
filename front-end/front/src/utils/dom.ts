// @ts-nocheck
import Vue from 'vue';

const isServer = Vue.prototype.$isServer; // 是否是ssr
const SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const ieVersion = isServer ? 0 : Number(document.documentMode); // 真的也就ie有这个属性 Edge都没有 值是ie版本号

const trim = function(string: string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

const camelCase = function(name: string) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1');
};

export const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(
      element: Element | Document | Window,
      event: string,
      handler: EventListenerOrEventListenerObject,
    ) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    // 兼容IE7、IE8
    return function(
      element: Element | Document | Window,
      event: string,
      handler: EventListenerOrEventListenerObject,
    ) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

export const off = (function() {
  if (!isServer && document.removeEventListener) {
    return function(
      element: Element | Document | Window,
      event: string,
      handler: EventListenerOrEventListenerObject,
    ) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    // 兼容IE7、IE8
    return function(
      element: Element | Document | Window,
      event: string,
      handler: EventListenerOrEventListenerObject,
    ) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();

export const once = function(el: Element, event: string, fn: Function) {
  const listener = function(this: void, ...args: any) {
    if (fn) {
      fn.apply(this, args);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};

export function hasClass(el: Element, cls: string) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1)
    throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

export function addClass(el: Element, cls: string) {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass(el: Element, cls: string) {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = ' ' + el.className + ' ';

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

export const getStyle =
  ieVersion < 9 // 兼容IE8以下的处理
    ? function(element: Element, styleName: string) {
        if (isServer) return;
        if (!element || !styleName) return null;
        styleName = camelCase(styleName);
        if (styleName === 'float') {
          styleName = 'styleFloat';
        }
        try {
          switch (styleName) {
            case 'opacity':
              try {
                return element.filters.item('alpha').opacity / 100;
              } catch (e) {
                return 1.0;
              }
            default:
              return element.style[styleName] || element.currentStyle
                ? element.currentStyle[styleName]
                : null;
          }
        } catch (e) {
          return element.style[styleName];
        }
      }
    : function(element: HTMLElement, styleName: string) {
        if (isServer) return;
        if (!element || !styleName) return null;
        styleName = camelCase(styleName);
        if (styleName === 'float') {
          styleName = 'cssFloat';
        }
        try {
          const computed = document.defaultView.getComputedStyle(element, '');
          return element.style[styleName] || computed
            ? computed[styleName]
            : null;
        } catch (e) {
          return element.style[styleName];
        }
      };

export function setStyle(
  element: HTMLElement,
  styleName: string,
  value: number,
) {
  if (!element || !styleName) return;

  if (typeof styleName === 'object') {
    for (const prop in styleName) {
      if (Object.prototype.hasOwnProperty.call(styleName, prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value)
        ? ''
        : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
}
// vertical: true 表示垂直方向
export const isScroll = (el: Element, vertical?: boolean) => {
  if (isServer) return;

  const determinedDirection =
    vertical !== null || typeof vertical !== 'undefined';
  const overflow = determinedDirection
    ? vertical
      ? getStyle(el, 'overflow-y')
      : getStyle(el, 'overflow-x')
    : getStyle(el, 'overflow');

  return overflow.match(/(scroll|auto)/);
};

/**
 * 获取滚动容器
 * @param el
 * @param vertical
 */
export const getScrollContainer = (el: Element, vertical?: boolean) => {
  if (isServer) return;

  let parent = el as (Node & ParentNode) | null;
  while (parent) {
    if (
      [window, document, document.documentElement].includes(
        (parent as unknown) as Window & typeof globalThis,
      )
    ) {
      return window;
    }
    if (isScroll(parent, vertical)) {
      return parent;
    }
    parent = parent.parentNode;
  }

  return parent;
};

/**
 * 是否在容器内部
 * @param el
 * @param container
 */
export const isInContainer = (el: Element, container: HTMLElement) => {
  if (isServer || !el || !container) return false;

  const elRect = el.getBoundingClientRect();
  let containerRect;
  if (
    [window, document, document.documentElement, null, undefined].includes(
      container,
    )
  ) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0,
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }

  return (
    elRect.top < containerRect.bottom &&
    elRect.bottom > containerRect.top &&
    elRect.right > containerRect.left &&
    elRect.left < containerRect.right
  );
};
