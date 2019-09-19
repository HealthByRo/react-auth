import {
  useEffect,
  useState,
} from 'react';
import extendTokenLifetime from './extendTokenLifetime';
import calculateExpiryTime from './utils/calculateExpiryTime';
import isExpired from './utils/isExpired';
import wait from './utils/wait';

export default function useExtendTokenLifetime(tokenData, onSuccess, onFailure) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let unmounted = false;

    const switchToReady = () => {
      if (!unmounted && !isReady) {
        setIsReady(true);
      }
    };

    const callExtendTokenLifetime = async () => {
      try {
        if (tokenData) {
          if (isReady) {
            const expiryTime = calculateExpiryTime(tokenData.expireAt);
            await wait(expiryTime);
          }

          const response = await extendTokenLifetime(tokenData);

          onSuccess(response);
        }
      } catch (error) {
        onFailure(error);
      } finally {
        switchToReady();
      }
    };

    if (tokenData && !isExpired(tokenData.expireAt)) {
      callExtendTokenLifetime();
    } else {
      switchToReady();
    }

    return () => {
      unmounted = true;
    };
  }, [tokenData]);

  return [isReady];
}
