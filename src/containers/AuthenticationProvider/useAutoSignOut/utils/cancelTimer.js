
import {
  getTimer,
  setTimer,
} from './timer';

export default function cancelTimer() {
  clearTimeout(getTimer());
  setTimer(null);
}
