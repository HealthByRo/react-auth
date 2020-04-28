import setLastActive from './setLastActive';
import { getTimer } from './timer';

export default function resetTimer() {
  if (getTimer()) {
    setLastActive(new Date().getTime());
  }
}
