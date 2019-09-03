import { AUTH_KEY } from '../constants';

export default function removeAuthDataFromStorage() {
  try {
    localStorage.removeItem(AUTH_KEY);
    return true;
  } catch (e) {
    return false;
  }
}
