import isTokenValid from './isTokenValid';

export default function isAuthenticated(tokenData, userData) {
  return Boolean(tokenData && userData) && isTokenValid(tokenData);
}
