import { useEffect } from 'react';
import { signOut } from '../../../api';

export default function useSignOutSync(isAuthenticated) {
  return useEffect(() => {
    if (isAuthenticated) {
      signOut().catch(() => {
        // TODO what to do on fail?
      });
    }
  }, [isAuthenticated]);
}
