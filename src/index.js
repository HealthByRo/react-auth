import AuthenticationProvider from './containers/AuthenticationProvider';
import Context from './containers/AuthenticationProvider/context';
import useAuthContext from './containers/AuthenticationProvider/useAuthContext';
import { removeAuthorizationTokenInHeaders } from './api';
import { setConfig } from './config';

export * from './containers/AuthenticationProvider/constants';
export default AuthenticationProvider;
export {
  AuthenticationProvider,
  Context,
  removeAuthorizationTokenInHeaders,
  setConfig,
  useAuthContext,
};
