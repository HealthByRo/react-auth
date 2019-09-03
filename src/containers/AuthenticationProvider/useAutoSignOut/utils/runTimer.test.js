import cancelTimer from './cancelTimer';
import getTimeToAutoSignOut from './getTimeToAutoSignOut';
import isUserActive from './isUserActive';
import runTimer from './runTimer';
import { setTimer } from './timer';

jest.mock('./cancelTimer', () => jest.fn());
jest.mock('./getTimeToAutoSignOut', () => jest.fn());
jest.mock('./timer', () => ({
  setTimer: jest.fn(),
}));
jest.mock('./isUserActive', () => jest.fn());

const TIME_TO_AUTO_SIGN_OUT = 1000;

getTimeToAutoSignOut.mockReturnValue(TIME_TO_AUTO_SIGN_OUT);

jest.useFakeTimers();

describe('autoSignOut > runTimer', () => {
  const onCancel = jest.fn();

  describe('when user is active', () => {
    beforeEach(() => {
      isUserActive
        .mockReset()
        .mockReturnValueOnce(true)
        .mockReturnValue(false);

      runTimer(onCancel);
    });

    it('calls setTimeout', () => {
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), TIME_TO_AUTO_SIGN_OUT);
    });

    it('calls setTimer on first run', () => {
      expect(setTimer).toHaveBeenCalledWith(1);
    });

    it('does NOT call onCancel', () => {
      expect(onCancel).not.toHaveBeenCalled();
    });

    describe('fast-forward time by TIME_TO_AUTO_SIGN_OUT', () => {
      beforeEach(() => {
        jest.advanceTimersByTime(TIME_TO_AUTO_SIGN_OUT * 2);
      });

      it('calls isUserActive second time (recurrent)', () => {
        expect(isUserActive).toHaveBeenCalledTimes(5);
      });

      it('calls onCancel', () => {
        expect(onCancel).toHaveBeenCalled();
      });
    });
  });

  describe('when user is not active', () => {
    beforeEach(() => {
      isUserActive.mockReturnValue(false);

      runTimer(onCancel);
      jest.runAllTimers();
    });

    it('calls setTimeout', () => {
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), TIME_TO_AUTO_SIGN_OUT);
    });

    it('calls cancelTimer', () => {
      expect(cancelTimer).toHaveBeenCalled();
    });

    it('calls onCancel on second run (recurrent)', () => {
      expect(onCancel).toHaveBeenCalled();
    });
  });
});
