export default function calculateExpiryTime(expireAt) {
  const NOW = new Date().getTime();
  const expires = Date.parse(expireAt);
  const expiresEarlierBy = 60 * 1000;

  return expires - NOW - expiresEarlierBy;
}
