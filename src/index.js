import AuthenticationProvider from './containers/AuthenticationProvider';
import { removeAuthorizationTokenInHeaders } from './api';
import { setConfig } from './config';

export * from './containers/AuthenticationProvider/constants';
export default AuthenticationProvider;
export {
  AuthenticationProvider,
  removeAuthorizationTokenInHeaders,
  setConfig,
};
