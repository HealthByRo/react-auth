import { TOKEN_STATUS_AWAITING_SECOND_FACTOR } from '../constants';

export default function isTokenAwaitingSecondFactor(tokenData) {
  return Boolean(tokenData) && tokenData.status === TOKEN_STATUS_AWAITING_SECOND_FACTOR;
}
