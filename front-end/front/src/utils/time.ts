export function time2day(time: Date, placeholder = '-'): string {
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  // const hour = time.getHours();
  // const minute = time.getMinutes();
  // const second = time.getSeconds();
  return `${year}${placeholder}${month}${placeholder}${day}`;
}
