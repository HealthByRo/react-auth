import config from '~/config';
import getLastActive from './getLastActive';

export default function isUserActive() {
  const lastActive = getLastActive();
  const autoSignOutAt = new Date().getTime() - config.autoSignOutWithin;

  return Boolean(lastActive && lastActive > autoSignOutAt);
}
