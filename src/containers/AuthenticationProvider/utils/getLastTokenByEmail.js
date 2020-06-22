import getAuthDataFromStorage from './getAuthDataFromStorage';
import generateLastUserTokenKey from './generateLastUserTokenKey';

export default function getLastTokenByEmail(email) {
  const store = getAuthDataFromStorage();
  const lastUserTokenKey = generateLastUserTokenKey(email);

  return store?.lastTokens?.[lastUserTokenKey];
}
