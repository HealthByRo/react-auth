import { useEffect } from 'react';

export default function useIsUserAuthenticated(userIsAuthenticated, authenticatedCallback) {
  return useEffect(() => {
    if (userIsAuthenticated) {
      authenticatedCallback();
    }
  }, [userIsAuthenticated]);
}
