import React, {
  useState,
  useDebugValue,
} from 'react';
import PropTypes from 'prop-types';
import Context from './context';
import isAuthenticated from './utils/isAuthenticated';
import resetAutoSignOutTimer from './useAutoSignOut/utils/resetTimer';
import useExtendTokenLifetime from './useExtendTokenLifetime';
import useLocalStorageSync from './useLocalStorageSync';
import useApiClientSync from './useApiClientSync';
import useAutoSignOut from './useAutoSignOut';
import useSignOutSync from './useSignOutSync';
import useSignOut from './useSignOut';
import useAuthResponseCallback from './useAuthResponseCallback';
import getAuthDataFromStorage from './utils/getAuthDataFromStorage';

const authDataInLocalStorage = getAuthDataFromStorage();

export default function AuthProvider(props) {
  const [tokenData, setTokenData] = useState(authDataInLocalStorage && authDataInLocalStorage.tokenData);
  const [userData, setUserData] = useState();

  const userIsAuthenticated = isAuthenticated(tokenData, userData);

  const authResponseCallback = useAuthResponseCallback(tokenData, userData, setTokenData, setUserData);
  const signOut = useSignOut(setTokenData, setUserData);

  const [isReady] = useExtendTokenLifetime(tokenData, authResponseCallback, signOut);

  useLocalStorageSync(tokenData, userData);

  // order of hooks is important
  // before removing auth token from apiClient using useApiClientSync
  // useSignOutSync must send request to server, which requires auth token
  useSignOutSync(userIsAuthenticated);
  useApiClientSync(tokenData);

  useAutoSignOut(userIsAuthenticated, signOut);
  useDebugValue(userIsAuthenticated ? 'Authenticated' : 'Not authenticated');

  return (
    <Context.Provider
      value={{
        isAuthenticated: userIsAuthenticated,
        isReady,
        setTokenData,
        setUserData,
        signOut,
        tokenData,
        userData,
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
