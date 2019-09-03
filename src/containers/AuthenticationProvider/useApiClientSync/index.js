import { useEffect } from 'react';
import {
  removeAuthorizationTokenInHeaders,
  setAuthorizationTokenInHeaders,
} from '../../../api';

export default function useApiClientSync(tokenData) {
  return useEffect(() => {
    if (tokenData) {
      setAuthorizationTokenInHeaders(tokenData.key);
    } else {
      removeAuthorizationTokenInHeaders();
    }
  }, [tokenData]);
}
