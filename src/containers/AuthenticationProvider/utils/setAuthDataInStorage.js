import { Base64 } from 'js-base64';
import getAuthDataFromStorage from './getAuthDataFromStorage';
import setItemInStorage from './setItemInStorage';
import { AUTH_KEY } from '../constants';

export default function setAuthDataInStorage(authData) {
  const currentAuthData = getAuthDataFromStorage();
  const mergedAuthData = {
    ...currentAuthData,
    ...authData,
  };
  const authDataAsString = JSON.stringify(mergedAuthData);
  const encodedAuthData = Base64.encode(authDataAsString).toString();

  return setItemInStorage(AUTH_KEY, encodedAuthData);
}
