import { useEffect, useRef } from 'react';
import { signOut } from '../../../api';

export default function useSignOutSync(isAuthenticated) {
  const ref = useRef(false);

  return useEffect(() => {
    if (!isAuthenticated && ref.current) {
      signOut().catch(() => {
        // TODO what to do on fail?
      });
    }

    ref.current = true;
  }, [isAuthenticated]);
}
