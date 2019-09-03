import getLastActive from './getLastActive';
import setLastActive from './setLastActive';
import getItemFromStorage from '../../utils/getItemFromStorage';
import { LAST_ACTIVE_KEY } from '../../constants';

describe('getLastActive/setLastActive', () => {
  it('return undefined when calling getLastActive()', () => {
    expect(getLastActive()).toBeUndefined();
  });

  describe('when calling setLastActive(TEST_LAST_ACTIVE_TIME)', () => {
    const TEST_LAST_ACTIVE_TIME = 'TEST_LAST_ACTIVE_TIME';

    beforeEach(() => {
      setLastActive(TEST_LAST_ACTIVE_TIME);
    });

    it('return TEST_LAST_ACTIVE_TIME when calling getLastActive()', () => {
      expect(getLastActive()).toEqual(TEST_LAST_ACTIVE_TIME);
    });

    it('return TEST_LAST_ACTIVE_TIME when calling getItemFromStorage(LAST_ACTIVE_KEY)', () => {
      expect(getItemFromStorage(LAST_ACTIVE_KEY)).toEqual(TEST_LAST_ACTIVE_TIME);
    });
  });
});
