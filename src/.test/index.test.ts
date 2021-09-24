import {
  EVENT_COLLECTION_NAME,
  GLOBAL_NAME,
  init,
  registerEvent,
  dispatchEvent,
  subscribeEvent
} from '..';

describe('test', () => {
  beforeAll(() => {
    init();
  });

  test('initialized', () => {
    expect(window[GLOBAL_NAME]).toBeTruthy();
  });

  test('registerEvent', () => {
    registerEvent('init');
    expect(window[GLOBAL_NAME][EVENT_COLLECTION_NAME]['init']).toBeTruthy();
  });

  test('subscribeEvent', () => {
    registerEvent('event1');

    setTimeout(() => {
      dispatchEvent('event1', 'ok');
    }, 200);

    return new Promise((resolve) => {
      subscribeEvent('event1', (data) => {
        expect(data).toEqual('ok');
        resolve(null);
      });
    });
  });
});
