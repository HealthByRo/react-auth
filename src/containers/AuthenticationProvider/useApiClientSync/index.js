import { useEffect } from 'react';
import {
  removeAuthorizationTokenInHeaders,
  setAuthorizationTokenInHeaders,
} from '../../../api';
import isTokenAwaitingSecondFactor from '../utils/isTokenAwaitingSecondFactor';

export default function useApiClientSync(tokenData) {
  return useEffect(() => {
    if (Boolean(tokenData) && !isTokenAwaitingSecondFactor(tokenData)) {
      setAuthorizationTokenInHeaders(tokenData.key);
    } else {
      removeAuthorizationTokenInHeaders();
    }
  }, [tokenData]);
}
