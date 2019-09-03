import setLastActive from './setLastActive';
import cancelTimer from './cancelTimer';
import runTimer from './runTimer';
import { getTimer } from './timer';

export default function resetTimer() {
  if (getTimer()) {
    cancelTimer();
    setLastActive();
    runTimer();
  }
}
