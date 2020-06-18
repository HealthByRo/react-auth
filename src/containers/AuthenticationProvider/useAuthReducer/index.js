import { useReducer, useMemo } from 'react';
import getAuthDataFromStorage from '../utils/getAuthDataFromStorage';
import reducer from './reducer';

const authDataInLocalStorage = getAuthDataFromStorage();

export default function useAuthReducer() {
  const [state, dispatch] = useReducer(reducer, {
    isReady: false,
    userWasAutoSignedOut: false,
    tokenData: authDataInLocalStorage?.tokenData || undefined,
  });

  const actions = useMemo(() => ({
    clearAuthData: () => dispatch({ type: 'clearAuthData' }),
    setAuthData: (authData) => dispatch({ type: 'setAuthData', ...authData }),
    setIsReady: (isReady) => dispatch({ type: 'setIsReady', isReady }),
    setTokenData: (tokenData) => dispatch({ type: 'setTokenData', tokenData }),
    setUserData: (userData) => dispatch({ type: 'setUserData', userData }),
    setUserWasAutoSignedOut: (userWasAutoSignedOut) => dispatch({ type: 'setUserWasAutoSignedOut', userWasAutoSignedOut }),
  }), []);

  return [state, actions];
}
