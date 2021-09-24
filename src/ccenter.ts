import { NextObserver, Subject } from 'rxjs';

export const GLOBAL_NAME = '__$CCenter__';
export const EVENT_COLLECTION_NAME = '__events__';
export const STATE_COLLECTION_NAME = '__states__';

export interface State {
  value: any;
  observable: Subject<any>;
}

function checkCCenterStatus() {
  if (!window[GLOBAL_NAME]) {
    const errorMsg = 'CCenter没有初始化';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  return true;
}

export function getEventByName(name: string): Subject<any> | undefined {
  return window[GLOBAL_NAME][EVENT_COLLECTION_NAME][name];
}

export function getStateByName(name: string): State | undefined {
  return window[GLOBAL_NAME][STATE_COLLECTION_NAME][name];
}

export function init() {
  if (window[GLOBAL_NAME]) {
    console.warn('CCenter已经初始化，请不要重复初始化');
    return;
  }
  window[GLOBAL_NAME] = {
    [EVENT_COLLECTION_NAME]: {},
    [STATE_COLLECTION_NAME]: {},
  };
}

export function registerEvent(name: string) {
  checkCCenterStatus();
  if (getEventByName(name)) {
    console.error(`事件"${name}"已存在，不能重复注册。`);
    return;
  }
  const subject = new Subject();
  window[GLOBAL_NAME][EVENT_COLLECTION_NAME][name] = subject;
  return subject;
}

export function registerState(name: string, value: any = null) {
  checkCCenterStatus();
  if (getStateByName(name)) {
    console.error(`State"${name}"已存在，不能重复注册。`);
    return;
  }
  const state: State = {
    value,
    observable: new Subject(),
  };
  window[GLOBAL_NAME][STATE_COLLECTION_NAME][name] = state;
  return state;
}

export function subscribeEvent(name: string, next: (value: any) => void) {
  checkCCenterStatus();
  const event = getEventByName(name);
  if (!event) {
    const errorMsg = `Event: ${name} 不存在`;
    console.error(errorMsg);
    return undefined;
  }
  const subscription = event.subscribe(next);
  return {
    unsubscribe: () => {
      subscription.unsubscribe();
    },
  };
}

export function dispatchEvent(name: string, payload: any) {
  checkCCenterStatus();
  const event = getEventByName(name);
  if (!event) {
    const errorMsg = `Event: ${name} 不存在`;
    console.error(errorMsg);
    return new Error(errorMsg);
  }
  event.next(payload);
}

export function removeEvent(name: string) {
  checkCCenterStatus();
  const event = getEventByName(name);
  if (!event) {
    const errorMsg = `Event: ${name} 不存在`;
    console.error(errorMsg);
    return new Error(errorMsg);
  }
  window[GLOBAL_NAME][EVENT_COLLECTION_NAME][name] = undefined;
}

export function getState(name: string) {
  checkCCenterStatus();
  const state = getStateByName(name);
  if (!state) {
    const errorMsg = `State: ${name} 不存在`;
    console.error(errorMsg);
    return undefined;
  }
  return state.value;
}

export function subscribeState(name: string, next: (value: any) => void) {
  checkCCenterStatus();
  const state = getStateByName(name);
  if (!state) {
    const errorMsg = `State: ${name} 不存在`;
    console.error(errorMsg);
    return null;
  }
  const subscription = state.observable.subscribe(next);
  return {
    unsubscribe: () => subscription.unsubscribe(),
  };
}

export function setState(name: string, value: any) {
  checkCCenterStatus();
  const state = getStateByName(name);
  if (!state) {
    const errorMsg = `State: ${name} 不存在`;
    console.error(errorMsg);
    return new Error(errorMsg);
  }
  state.value = value;
  state.observable.next(value);
}
