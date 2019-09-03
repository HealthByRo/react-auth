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

export default function AuthProvider(props) {
  const [tokenData, setTokenData] = useState();
  const [userData, setUserData] = useState();

  const userIsAuthenticated = isAuthenticated(tokenData, userData);

  const authResponseCallback = useAuthResponseCallback(tokenData, userData, setTokenData, setUserData);
  const signOut = useSignOut(setTokenData, setUserData);

  const [isReady] = useExtendTokenLifetime(tokenData, authResponseCallback, signOut);

  useLocalStorageSync();
  useApiClientSync();
  useSignOutSync(userIsAuthenticated);
  useAutoSignOut(userIsAuthenticated, signOut);
  useDebugValue(userIsAuthenticated ? 'Authenticaed' : 'Not authenticated');

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
