import apiClient, { setHeaders } from 'api-client';

export function extendTokenLifetime(token) {
  const config = {
    headers: { Authorization: `Token ${token}` },
  };
  return apiClient.post('/auth/token/extend-lifetime', {}, config);
}

export function signOut() {
  return apiClient.post('/auth/logout');
}

export function setAuthorizationTokenInHeaders(token) {
  setHeaders({
    Authorization: `Token ${token}`,
  });
}

export function removeAuthorizationTokenInHeaders() {
  delete apiClient.defaults.headers.Authorization;
}
