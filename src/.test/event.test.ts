import {
  EVENT_COLLECTION_NAME,
  GLOBAL_NAME,
  init,
  registerEvent,
  dispatchEvent,
  subscribeEvent,
  removeEvent
} from '..';

describe('event', () => {
  beforeAll(() => {
    init();
  });

  test('register event', () => {
    registerEvent('init');
    expect(window[GLOBAL_NAME][EVENT_COLLECTION_NAME]['init']).toBeTruthy();
  });

  test('dispatch and subscribe event', () => {
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

  test('remove event', () => {
    removeEvent('event1');
    const result = subscribeEvent('event1', () => {});
    expect(result).toBeFalsy();
  })
});
