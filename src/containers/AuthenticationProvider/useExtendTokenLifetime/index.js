import {
  useEffect,
  useRef,
  useState,
} from 'react';
import extendTokenLifetime from './extendTokenLifetime';
import calculateExpiryTime from './utils/calculateExpiryTime';
import isExpired from './utils/isExpired';
import wait from './utils/wait';

export default function useExtendTokenLifetime(tokenData, onSuccess, onFailure) {
  const processingRef = useRef(false);
  const mountedRef = useRef(true);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    mountedRef.current = true;

    const switchToReady = () => {
      if (mountedRef.current && !isReady) {
        setIsReady(true);
      }

      processingRef.current = false;
    };

    const callExtendTokenLifetime = async () => {
      if (!processingRef.current) {
        processingRef.current = true;

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
      }
    };

    if (tokenData) {
      if (isExpired(tokenData.expireAt)) {
        onFailure();
        switchToReady();
      } else {
        callExtendTokenLifetime();
      }
    } else {
      switchToReady();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [tokenData]);

  return [isReady];
}
