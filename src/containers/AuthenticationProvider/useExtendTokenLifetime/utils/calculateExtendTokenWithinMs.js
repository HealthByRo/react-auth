import calculateExpiryTime from './calculateExpiryTime';

export const EXTEND_BEFORE_AUTO_SIGN_OUT_TIME = 30 * 1000;

export default function calculateExtendTokenWithinMs(expireAt, autoSignOutWithin) {
  const tokenExpireInMs = calculateExpiryTime(expireAt);

  if (autoSignOutWithin) {
    return Math.min(tokenExpireInMs, autoSignOutWithin - EXTEND_BEFORE_AUTO_SIGN_OUT_TIME);
  }

  return tokenExpireInMs;
}
