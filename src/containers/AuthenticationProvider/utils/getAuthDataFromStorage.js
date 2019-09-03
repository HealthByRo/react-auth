import { Base64 } from 'js-base64';
import { AUTH_KEY } from '../constants';
import getItemFromStorage from './getItemFromStorage';

export default function getAuthDataFromStorage() {
  const localStorageItem = getItemFromStorage(AUTH_KEY);

  if (localStorageItem) {
    try {
      const decodedLocalStorageItem = Base64.decode(localStorageItem);

      return JSON.parse(decodedLocalStorageItem);
    } catch (e) {
      return null;
    }
  }

  return localStorageItem;
}
