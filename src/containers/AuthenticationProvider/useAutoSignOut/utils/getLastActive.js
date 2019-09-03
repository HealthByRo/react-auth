import getItemFromStorage from '../../utils/getItemFromStorage';
import { LAST_ACTIVE_KEY } from '../../constants';

export default function getLastActive() {
  return getItemFromStorage(LAST_ACTIVE_KEY);
}
