import { useEffect } from 'react';
import config from '~/config';
import cancelAutoSignOutTimer from './utils/cancelTimer';
import setLastActive from './utils/setLastActive';
import runAutoSignOutTimer from './utils/runTimer';

export default function useAutoSignOut(isAuthenticated, signOut) {
  useEffect(() => {
    if (config.autoSignOutWithin) {
      if (isAuthenticated) {
        setLastActive();
        runAutoSignOutTimer(signOut);
      } else {
        cancelAutoSignOutTimer();
      }
    }
  }, [isAuthenticated]);

  useEffect(() => cancelAutoSignOutTimer, []);
}
