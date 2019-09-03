export default function isExpired(expireAt) {
  return (new Date().getTime() - Date.parse(expireAt)) >= 0;
}
