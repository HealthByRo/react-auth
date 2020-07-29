import React, { useDebugValue, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './context';
import isAuthenticated from './utils/isAuthenticated';
import isTokenAwaitingSecondFactor from './utils/isTokenAwaitingSecondFactor';
import resetAutoSignOutTimer from './useAutoSignOut/utils/resetTimer';
import useExtendTokenLifetime from './useExtendTokenLifetime';
import useLocalStorageSync from './useLocalStorageSync';
import useApiClientSync from './useApiClientSync';
import useAutoSignOut from './useAutoSignOut';
import useIsUserAuthenticated from './useIsUserAuthenticated';
import useSignOutSync from './useSignOutSync';
import useAuthReducer from './useAuthReducer';
import getLastTokenByEmail from './utils/getLastTokenByEmail';
import debounce from './utils/debounce';

export default function AuthProvider(props) {
  const [{
    featureFlags,
    tokenData,
    userData,
    isReady,
    userWasAutoSignedOut,
  }, {
    clearAuthData,
    setAuthData,
    setIsReady,
    setTokenData,
    setUserData,
    setFeatureFlags,
    setUserWasAutoSignedOut,
  }] = useAuthReducer();
  const userIsAuthenticated = isAuthenticated(tokenData, userData);
  const tokenIsAwaitingSecondFactor = isTokenAwaitingSecondFactor(tokenData);
  const handleActivity = debounce(resetAutoSignOutTimer, 300);
  const onExtendTokenLifeTimeSuccess = (authData) => {
    if (authData) {
      setAuthData(authData);
    } else {
      setIsReady(true);
    }
  };
  const onAuthenticationSuccess = () => setUserWasAutoSignedOut(false);
  const onAutoSignoutSuccess = () => {
    setUserWasAutoSignedOut(true);
    clearAuthData();
  };

  useExtendTokenLifetime(tokenData, onExtendTokenLifeTimeSuccess, clearAuthData, isReady);
  useIsUserAuthenticated(userIsAuthenticated, onAuthenticationSuccess);
  useLocalStorageSync(tokenData, userData);

  // order of hooks is important
  // before removing auth token from apiClient using useApiClientSync
  // useSignOutSync must send request to server, which requires auth token
  useSignOutSync(userIsAuthenticated);
  useApiClientSync(tokenData);
  useAutoSignOut(userIsAuthenticated, onAutoSignoutSuccess);
  useDebugValue(userIsAuthenticated ? 'Authenticated' : 'Not authenticated');

  // Register event listeners on the window for activity tracking
  useEffect(() => {
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('mousemove', handleActivity);

    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        isAuthenticated: userIsAuthenticated,
        isAwaitingSecondFactor: tokenIsAwaitingSecondFactor,
        isReady,
        setTokenData,
        setUserData,
        setAuthData,
        setFeatureFlags,
        signOut: clearAuthData,
        getLastTokenByEmail,
        tokenData,
        userData,
        featureFlags,
        userWasAutoSignedOut,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
