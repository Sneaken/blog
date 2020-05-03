export function createRandomString(min: number, max?: number): string {
  let returnStr = '';
  const range = max ? Math.round(Math.random() * (max - min)) + min : min;
  const charStr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < range; i++) {
    const index = Math.round(Math.random() * (charStr.length - 1));
    returnStr += charStr.substring(index, index + 1);
  }
  return returnStr;
}
