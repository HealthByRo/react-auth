import config from '~/config';
import getLastActive from './getLastActive';

/**
* Function calculates time to auto sign out (in ms) based on last active time.
* Thanks to this each tab will be signed out at the same time.
*/
export default function getTimeToAutoSignOut() {
  const lastActive = getLastActive();

  if (lastActive) {
    const expireWithinMs = config.autoSignOutWithin - (new Date().getTime() - lastActive);

    return Math.max(0, expireWithinMs);
  }

  return config.autoSignOutWithin;
}
