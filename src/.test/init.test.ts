import { GLOBAL_NAME, init, initialized } from '..';

describe('init', () => {
  beforeAll(() => {
    expect(initialized).toBeFalsy();
    init();
  });

  test('initialized', () => {
    expect(window[GLOBAL_NAME]).toBeTruthy();
    expect(initialized).toBeTruthy();
  });
});
