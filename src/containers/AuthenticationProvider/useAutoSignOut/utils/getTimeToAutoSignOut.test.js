import MockDate from 'mockdate';
import getLastActive from './getLastActive';
import config from '../../../../config';
import getTimeToAutoSignOut from './getTimeToAutoSignOut';

jest.mock('./getLastActive', () => jest.fn());
jest.mock('../../../../config', () => ({
  autoSignOutWithin: 10000, // 10s
}));

describe('autoSignOut > getTimeToAutoSignOut', () => {
  describe('when getLastActive returns undefined', () => {
    beforeEach(() => {
      getLastActive.mockReturnValue(undefined);
    });

    it('return time defined in config.autoSignOutWithin', () => {
      expect(getTimeToAutoSignOut()).toEqual(config.autoSignOutWithin);
    });
  });

  describe('when getLastActive returns last active time', () => {
    const NOW = 1540977077000;

    beforeEach(() => {
      MockDate.set(NOW);
    });

    it('return config.autoSignOutWithin when last active time is NOW', () => {
      getLastActive.mockReturnValue(NOW);

      expect(getTimeToAutoSignOut()).toEqual(config.autoSignOutWithin);
    });

    it('return diffBetweenNow when diff between current time and last active time is lower than config.autoSignOutWithin', () => {
      const diffBetweenNow = 1000;
      getLastActive.mockReturnValue(NOW - diffBetweenNow);

      expect(config.autoSignOutWithin).toBeGreaterThan(diffBetweenNow);
      expect(getTimeToAutoSignOut()).toEqual(config.autoSignOutWithin - diffBetweenNow);
    });

    it('return 0 when diff between current time and last active time is higher than config.autoSignOutWithin', () => {
      const diffBetweenNow = 20000;
      getLastActive.mockReturnValue(NOW - diffBetweenNow);

      expect(diffBetweenNow).toBeGreaterThan(config.autoSignOutWithin);
      expect(getTimeToAutoSignOut()).toEqual(0);
    });

    it('return 0 when difference between last active time and current time is 0', () => {
      getLastActive.mockReturnValue(NOW - config.autoSignOutWithin);

      expect(getTimeToAutoSignOut()).toEqual(0);
    });
  });
});
