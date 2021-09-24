import {
  getState,
  GLOBAL_NAME,
  init,
  registerState,
  setState,
  STATE_COLLECTION_NAME,
  subscribeState,
} from '..';

describe('event', () => {
  beforeAll(() => {
    init();
  });

  test('register state', () => {
    registerState('state1');
    expect(window[GLOBAL_NAME][STATE_COLLECTION_NAME]['state1']).toBeTruthy();
  });

  test('set and get state', () => {
    setState('state1', 'hello');
    const state = getState('state1');
    expect(state).toEqual('hello');
  });

  test('subscribe state change', () => {
    registerState('state2');
    setTimeout(() => {
      setState('state2', 'hello');
    }, 200);
    return new Promise((resolve, reject) => {
      subscribeState('state2', (state) => {
        expect(state).toEqual('hello');
        resolve(null);
      });
    });
  });
});
