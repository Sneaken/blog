export function isString(obj: any): boolean {
  // 为什么不用 type obj === 'string'
  // console.log(typeof new String('string')) // 这就是原因
  // Object.prototype.toString.call(new String('string'))
  return Object.prototype.toString.call(obj) === '[object String]';
}

/**
 * 这是个知道对象是个JSON时使用
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 * @param obj
 */
function isObject(obj: any) {
  return obj !== null && typeof obj === 'object';
}
/**
 * 这个最准 理由还是 new String('string')
 * Strict object type check.
 * Only returns true for plain JavaScript objects.
 * @param obj
 */
export function isPlainObject(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function isHtmlElement(node: Node): boolean {
  return node && node.nodeType === Node.ELEMENT_NODE;
}

export const isFunction = (functionToCheck: any): boolean => {
  const getType = {};
  return (
    functionToCheck &&
    getType.toString.call(functionToCheck) === '[object Function]'
  );
};

export const isUndefined = (val: any): boolean => {
  return val === void 0;
};

export const isDefined = (val: any): boolean => {
  return val !== undefined && val !== null;
};
