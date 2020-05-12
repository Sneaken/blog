// @ts-nocheck
import Vconsole from 'vconsole';
import { isMobile } from '@/utils/util';

const isDev = process.env.NODE_ENV === 'development';
/*eslint no-global-assign: "error"*/
/*globals console:true*/
let _useConsole = isDev;
const forkConsole = console;
const nullConsole = {
  assert: () => {},
  count: () => {},
  debug: () => {},
  dir: () => {},
  dirxml: () => {},
  error: () => {},
  exception: () => {},
  group: () => {},
  groupCollapsed: () => {},
  groupEnd: () => {},
  info: () => {},
  log: () => {},
  markTimeline: () => {},
  profile: () => {},
  profileEnd: () => {},
  table: () => {},
  time: () => {},
  timeEnd: () => {},
  timeStamp: () => {},
  timeline: () => {},
  timelineEnd: () => {},
  trace: () => {},
  warn: () => {},
};
console = isDev ? console : nullConsole;

Object.defineProperty(window, 'useConsole', {
  get() {
    return _useConsole;
  },
  set(newValue) {
    if (typeof newValue === 'boolean') {
      _useConsole = newValue;
      console = isDev || newValue ? forkConsole : nullConsole;
    }
  },
});

if (isDev && isMobile()) {
  new Vconsole();
}
