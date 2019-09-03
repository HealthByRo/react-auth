import { TOKEN_STATUS_VALID } from '../constants';

export default function isTokenValid(tokenData) {
  return tokenData.status === TOKEN_STATUS_VALID;
}
