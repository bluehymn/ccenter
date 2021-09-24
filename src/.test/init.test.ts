import { GLOBAL_NAME, init, checkInitialStatus } from '..';

describe('init', () => {
  beforeAll(() => {
    expect(checkInitialStatus()).toBeFalsy();
    init();
  });

  test('initialized', () => {
    expect(window[GLOBAL_NAME]).toBeTruthy();
    expect(checkInitialStatus()).toBeTruthy();
  });
});
