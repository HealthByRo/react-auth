import AuthenticationProvider from './containers/AuthenticationProvider';
import { setConfig } from './config';
import { removeAuthorizationTokenInHeaders } from './api';

import exportedAuthenticationProvider, {
  setConfig as exportedSetConfig,
  removeAuthorizationTokenInHeaders as exportedRemoveAuthorizationTokenInHeaders,
} from '.';

describe('redux-auth exports', () => {
  it('should export AuthenticationProvider by default', () => {
    expect(exportedAuthenticationProvider).toBe(AuthenticationProvider);
  });

  it('should export setConfig', () => {
    expect(exportedSetConfig).toBe(setConfig);
  });

  it('should export removeAuthorizationTokenInHeaders', () => {
    expect(exportedRemoveAuthorizationTokenInHeaders).toBe(removeAuthorizationTokenInHeaders);
  });
});
