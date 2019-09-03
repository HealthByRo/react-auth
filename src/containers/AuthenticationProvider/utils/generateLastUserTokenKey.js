import md5 from 'md5';

export default function generateLastUserTokenKey(rawKey) {
  return md5(rawKey.toLowerCase().trim());
}
