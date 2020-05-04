import Fingerprint from 'fingerprintjs2';
import { createRandomString } from '@/utils/other';
import { getCookie, setCookie } from '@/utils/cookie-manager';

function getIP(): Promise<object> {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = 'https://pv.sohu.com/cityjson?ie=utf-8';
    script.onload = () => {
      resolve((window as any).returnCitySN);
    };
    script.onerror = () => {
      resolve({ a: createRandomString(8) });
    };
    document.body.appendChild(script);
  });
}
async function createUIDString(): Promise<string> {
  try {
    const promise1 = Fingerprint.getPromise();
    const promise2 = getIP();
    const components = await promise1;
    const ip = await promise2;
    const values = components.map((component: any) => component.value);
    let uid = Fingerprint.x64hash128(values.join('') + JSON.stringify(ip), 1);
    if (!uid || uid.length !== 32) {
      uid = createRandomString(32);
    }
    return uid;
  } catch (e) {
    return createRandomString(32);
  }
}
function saveUserId(userID: string) {
  if (navigator.cookieEnabled) {
    const time = new Date('2039/1/1 0:0:0');
    setCookie('userID', userID, time);
  } else if (localStorage) {
    localStorage.setItem('userID', userID);
  }
}

export async function initUID() {
  let userID!: string;
  try {
    // 获取储存cookie的userID
    if (navigator.cookieEnabled) {
      userID = getCookie('userID') || '';
    } else if (localStorage) {
      userID = localStorage.getItem('userID') || '';
    }
    if (!userID) {
      userID = await createUIDString();
      saveUserId(userID);
    }
    return userID;
  } catch (e) {
    console.log('uid init failed:', e);
  }
}
