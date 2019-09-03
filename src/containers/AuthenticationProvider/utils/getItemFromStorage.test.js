import { Base64 } from 'js-base64';
import { validTokenData as tokenData } from '~/test.data';
import getItemFromStorage from './getItemFromStorage';
import setAuthDataInStorage from './setAuthDataInStorage';
import getAuthDataFromStorage from './getAuthDataFromStorage';
import removeAuthDataFromStorage from './removeAuthDataFromStorage';
import { AUTH_KEY } from '../constants';

describe('when calling setAuthDataInStorage({ tokenData })', () => {
  let result;

  beforeEach(() => {
    result = setAuthDataInStorage(tokenData);
  });

  it('should set encoded by base64 an object with a token in a localStorage', () => {
    const localStorageItem = getItemFromStorage(AUTH_KEY);
    const decodedLocalStorageItem = Base64.decode(localStorageItem);
    const decodedLocalStorageObject = JSON.parse(decodedLocalStorageItem);

    expect(decodedLocalStorageObject.key).toEqual(tokenData.key);
  });

  it('should returns true', () => {
    expect(result).toBe(true);
  });

  it('should returns an object with token when calling getAuthDataFromStorage()', () => {
    expect(getAuthDataFromStorage()).toEqual(tokenData);
  });

  describe('when calling removeAuthDataFromStorage()', () => {
    beforeEach(() => {
      result = removeAuthDataFromStorage();
    });

    it('should returns undefined when calling getAuthDataFromStorage()', () => {
      expect(getAuthDataFromStorage()).toBeUndefined();
    });

    it('should returns true', () => {
      expect(result).toBe(true);
    });
  });
});
