
import { validTokenData as tokenData } from '~/test.data';
import setAuthDataInStorage from './setAuthDataInStorage';
import getAuthDataFromStorage from './getAuthDataFromStorage';
import removeAuthDataFromStorage from './removeAuthDataFromStorage';

describe('when localStorage is disabled', () => {
  beforeEach(() => {
    window.localStorage = {
      getItem() {
        throw Error('localStorage is disabled');
      },
      setItem() {
        throw Error('localStorage is disabled');
      },
      removeItem() {
        throw Error('localStorage is disabled');
      },
      clear() {
        throw Error('localStorage is disabled');
      },
    };
  });

  describe('when calling setAuthDataInStorage(tokenData)', () => {
    let result;

    beforeEach(() => {
      result = setAuthDataInStorage(tokenData);
    });

    it('should return false', () => {
      expect(result).toBeFalsy();
    });

    it('should return undefined when calling getAuthDataFromStorage', () => {
      expect(getAuthDataFromStorage()).toBeUndefined();
    });

    it('should return false when calling removeAuthDataFromStorage()', () => {
      expect(removeAuthDataFromStorage()).toBeFalsy();
    });
  });
});
