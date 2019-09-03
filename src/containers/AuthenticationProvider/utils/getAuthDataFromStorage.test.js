import getAuthDataFromStorage from './getAuthDataFromStorage';
import setItemInStorage from './setItemInStorage';
import { AUTH_KEY } from '../constants';

describe('getAuthDataFromStorage', () => {
  it('returns null data saved in local storage is corrupted', () => {
    setItemInStorage(AUTH_KEY, 'BROKEN_DATA');

    expect(getAuthDataFromStorage()).toBeNull();
  });
});
