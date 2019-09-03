import getAuthDataFromStorage from './getAuthDataFromStorage';
import setAuthDataInStorage from './setAuthDataInStorage';

export default function storeLastUserToken(key, token) {
  const currentAuthData = getAuthDataFromStorage();

  currentAuthData.lastTokens = currentAuthData.lastTokens || {};
  currentAuthData.lastTokens[key] = token;

  return setAuthDataInStorage(currentAuthData);
}
