import { TOKEN_STATUS_AWAITING_SECOND_FACTOR } from '../constants';

export default function isTokenAwaitingSecondFactor(tokenData) {
  return tokenData.status === TOKEN_STATUS_AWAITING_SECOND_FACTOR;
}
