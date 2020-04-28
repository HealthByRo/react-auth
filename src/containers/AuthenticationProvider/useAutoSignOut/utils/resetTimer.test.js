import runTimer from './runTimer';
import setLastActive from './setLastActive';
import resetTimer from './resetTimer';
import cancelTimer from './cancelTimer';
import { setTimer } from './timer';

jest.mock('./cancelTimer', () => jest.fn());
jest.mock('./runTimer', () => jest.fn());
jest.mock('./setLastActive', () => jest.fn());

describe('autoSignOut > resetTimer', () => {
  describe('when timer is not set', () => {
    beforeEach(() => {
      resetTimer();
    });

    it('does NOT call cancelTimer', () => {
      expect(cancelTimer).not.toHaveBeenCalled();
    });

    it('does NOT call setLastActive', () => {
      expect(setLastActive).not.toHaveBeenCalled();
    });

    it('does NOT call runTimer', () => {
      expect(runTimer).not.toHaveBeenCalled();
    });
  });

  describe('when timer is set', () => {
    beforeEach(() => {
      setTimer('FAKE_TIMER');
      resetTimer();
    });

    it('calls setLastActive', () => {
      expect(setLastActive).toHaveBeenCalled();
    });
  });
});
