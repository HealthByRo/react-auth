import {
  useEffect,
  useState,
} from 'react';
import extendTokenLifetime from './extendTokenLifetime';
import calculateExpiryTime from './utils/calculateExpiryTime';
import isExpired from './utils/isExpired';

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
        const response = await extendTokenLifetime(tokenData.key);
        const expiryTime = calculateExpiryTime(response.tokenData.expireAt);

        onSuccess(response);

        setTimeout(callExtendTokenLifetime, expiryTime);
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
