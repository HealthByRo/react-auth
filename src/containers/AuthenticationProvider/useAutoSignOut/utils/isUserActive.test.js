import MockDate from 'mockdate';
import config from '../../../../config';
import isUserActive from './isUserActive';
import getLastActive from './getLastActive';

jest.mock('./getLastActive', () => jest.fn());
jest.mock('../../../../config', () => ({
  autoSignOutWithin: 5 * 60 * 1000,
}));

describe('isUserActive > user is considered as active when timestamp returned by getLastActive function is higher than difference between current time and config.autoSignOutWithin', () => {
  const NOW = 1492090098140;

  beforeEach(() => {
    MockDate.set(NOW);
  });

  it('returns true when getLastActive returns current time', () => {
    getLastActive.mockReturnValue(NOW);

    expect(isUserActive()).toBe(true);
  });

  it('returns true when getLastActive returns current time minus config.autoSignOutWithin + 1', () => {
    getLastActive.mockReturnValue(NOW + config.autoSignOutWithin + 1);

    expect(isUserActive()).toBe(true);
  });

  it('returns true when getLastActive returns current time minus config.autoSignOutWithin', () => {
    getLastActive.mockReturnValue(NOW + config.autoSignOutWithin);

    expect(isUserActive()).toBe(true);
  });

  it('returns true when getLastActive returns current time minus config.autoSignOutWithin - 1', () => {
    getLastActive.mockReturnValue(NOW + config.autoSignOutWithin - 1);

    expect(isUserActive()).toBe(true);
  });
});
