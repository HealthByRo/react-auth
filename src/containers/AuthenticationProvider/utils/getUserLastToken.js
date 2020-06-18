import getAuthDataFromStorage from './getAuthDataFromStorage';
import generateLastUserTokenKey from './generateLastUserTokenKey';

export default function getUserLastToken(email) {
  if (!email) {
    return undefined;
  }

  const store = getAuthDataFromStorage();
  const lastUserTokenKey = generateLastUserTokenKey(email);

  return store?.lastTokens?.[lastUserTokenKey];
}
