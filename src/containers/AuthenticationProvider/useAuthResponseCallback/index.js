import { useCallback } from 'react';

export default function useAuthResponseCallback(existingTokenData, existingUserData, setTokenData, setUserData) {
  return useCallback((response) => {
    const {
      data: {
        tokenData,
        userData,
      },
    } = response;

    setTokenData(tokenData);
    setUserData(userData);
  }, [existingTokenData, existingUserData]);
}
