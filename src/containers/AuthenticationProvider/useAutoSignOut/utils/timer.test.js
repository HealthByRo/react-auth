import {
  setTimer,
  getTimer,
} from './timer';

describe('autoSignOut > timer', () => {
  it('returns undefined when calling getTimer()', () => {
    expect(getTimer()).toBeUndefined();
  });

  describe('when calling setTimer(timer)', () => {
    const timer = 'TEST_TIMER';

    beforeEach(() => {
      setTimer(timer);
    });

    it('returns timer when calling getTimer()', () => {
      expect(getTimer()).toBe(timer);
    });
  });
});
