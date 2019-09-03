import {
  setTimer,
  getTimer,
} from './timer';
import cancelTimer from './cancelTimer';

jest.useFakeTimers();

describe('autoSignOut > cancelTimer', () => {
  const callback = jest.fn();

  beforeEach(() => {
    const timer = setTimeout(callback, 1000);

    setTimer(timer);
    cancelTimer();
    jest.runAllTimers();
  });

  it('timer callback has not been called', () => {
    expect(callback).not.toHaveBeenCalled();
  });

  it('returns null when calling getTimer()', () => {
    expect(getTimer()).toBeNull();
  });
});
