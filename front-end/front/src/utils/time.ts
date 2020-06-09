export function time2day(
  time: Date,
  placeholder: boolean | string = '-',
  toChinese = false,
): string {
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  // const hour = time.getHours();
  // const minute = time.getMinutes();
  // const second = time.getSeconds();
  if (typeof placeholder === 'boolean') {
    toChinese = placeholder;
  }
  if (toChinese) {
    return `${year}年${month}月${day}日`;
  } else {
    return `${year}${placeholder}${month}${placeholder}${day}`;
  }
}
