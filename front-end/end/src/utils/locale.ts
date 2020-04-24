function setLocale(lang: string) {
  if (lang !== undefined && !/^([a-z]{2})-([A-Z]{2})$/.test(lang)) {
    throw new Error('setLocale lang format error');
  }

  if (getLocale() !== lang) {
    window.localStorage.setItem('lang', lang);
    window.location.reload();
  }
}

function getLocale(): string {
  if (!window.localStorage.getItem('lang')) {
    window.localStorage.setItem('lang', navigator.language);
  }
  return localStorage.getItem('lang') as string;
}

export { setLocale, getLocale };
