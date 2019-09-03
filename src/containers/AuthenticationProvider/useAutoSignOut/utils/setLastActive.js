import setItemInStorage from '../../utils/setItemInStorage';
import { LAST_ACTIVE_KEY } from '../../constants';

export default function setLastActive(value) {
  return setItemInStorage(LAST_ACTIVE_KEY, value);
}
