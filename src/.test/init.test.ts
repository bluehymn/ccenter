import { GLOBAL_NAME, init } from '..';

describe('init', () => {
  beforeAll(() => {
    init();
  });

  test('initialized', () => {
    expect(window[GLOBAL_NAME]).toBeTruthy();
  });
});
