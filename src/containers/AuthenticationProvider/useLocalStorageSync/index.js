import { useEffect } from 'react';
import setAuthDataInStorage from '../utils/setAuthDataInStorage';
import storeLastUserToken from '../utils/storeLastUserToken';
import generateLastUserTokenKey from '../utils/generateLastUserTokenKey';

export default function useLocalStorageSync(tokenData, userData) {
  return useEffect(() => {
    setAuthDataInStorage({ tokenData });

    if (tokenData && userData) {
      const lastUserTokenKey = generateLastUserTokenKey(userData.email);

      storeLastUserToken(lastUserTokenKey, tokenData.key);
    }
  }, [tokenData, userData]);
}
