export function getCookie(key: string): string | null {
  const cookieStr = '; ' + document.cookie + '; ';
  const index = cookieStr.indexOf('; ' + key + '=');
  if (index !== -1) {
    const s = cookieStr.substring(index + key.length + 3, cookieStr.length);
    return unescape(s.substring(0, s.indexOf('; ')));
  } else {
    return null;
  }
}

export function setCookie(
  key: string,
  value: string,
  expires: number | Date = 1,
) {
  let expDate: Date;
  if (typeof expires === 'number') {
    const expDays = expires * 24 * 60 * 60 * 1000;
    expDate = new Date();
    expDate.setTime(expDate.getTime() + expDays);
  } else {
    expDate = expires;
  }
  const expString = expires ? `;expires=${expDate.toUTCString()}` : '';
  document.cookie = `${key}=${escape(value)}${expString};path=/`;
}

export function deleteCookie(key: string) {
  const exp = new Date(new Date().getTime() - 1);
  const s = getCookie(key);
  if (s != null) {
    document.cookie = `${key}=${s};expires=${exp.toUTCString()};path=/`;
  }
}
