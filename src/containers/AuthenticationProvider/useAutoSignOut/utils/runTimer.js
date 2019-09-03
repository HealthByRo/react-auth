import isUserActive from './isUserActive';
import getTimeToAutoSignOut from './getTimeToAutoSignOut';
import cancelTimer from './cancelTimer';
import { setTimer } from './timer';

export default function runTimer(onCancel) {
  const timer = setTimeout(
    () => {
      if (isUserActive()) {
        runTimer(onCancel);
      } else {
        cancelTimer();
        onCancel();
      }
    },
    getTimeToAutoSignOut()
  );

  setTimer(timer);
}
