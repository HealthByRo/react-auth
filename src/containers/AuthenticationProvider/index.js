import React, { useDebugValue } from 'react';
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

export default function AuthProvider(props) {
  const [{
    tokenData,
    userData,
    isReady,
    userWasAutoSignedOut,
  }, dispatch] = useAuthReducer();
  const userIsAuthenticated = isAuthenticated(tokenData, userData);
  const tokenIsAwaitingSecondFactor = isTokenAwaitingSecondFactor(tokenData);
  const clearAuthData = () => dispatch({ type: 'clearAuthData' });
  const setAuthData = (authData) => dispatch({ type: 'setAuthData', ...authData });
  const setIsReady = (_isReady) => dispatch({ type: 'setIsReady', isReady: _isReady });
  const setTokenData = (_tokenData) => dispatch({ type: 'setTokenData', tokenData: _tokenData });
  const setUserData = (_userData) => dispatch({ type: 'setUserData', userData: _userData });
  const setUserWasAutoSignedOut = (_userWasAutoSignedOut) => dispatch({ type: 'setUserWasAutoSignedOut', userWasAutoSignedOut: _userWasAutoSignedOut });

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

  return (
    <Context.Provider
      value={{
        isAuthenticated: userIsAuthenticated,
        isAwaitingSecondFactor: tokenIsAwaitingSecondFactor,
        isReady,
        setTokenData,
        setUserData,
        setAuthData,
        signOut: clearAuthData,
        tokenData,
        userData,
        userWasAutoSignedOut,
      }}
    >
      <div
        onClick={resetAutoSignOutTimer}
        onKeyPress={resetAutoSignOutTimer}
        role="button"
        tabIndex="0"
      >
        {props.children}
      </div>
    </Context.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
