import {
  useEffect,
  useRef,
} from 'react';
import extendTokenLifetime from './extendTokenLifetime';
import calculateExpiryTime from './utils/calculateExpiryTime';
import isExpired from './utils/isExpired';
import wait from './utils/wait';

export default function useExtendTokenLifetime(tokenData, onSuccess, onFailure, isReady) {
  const processingRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const callExtendTokenLifetime = async () => {
      if (!processingRef.current) {
        processingRef.current = true;

        try {
          if (isReady) {
            const expiryTime = calculateExpiryTime(tokenData.expireAt);
            await wait(expiryTime);
          }

          const response = await extendTokenLifetime(tokenData);

          processingRef.current = false;
          onSuccess(response.data);
        } catch (error) {
          processingRef.current = false;
          onFailure(error);
        }
      }
    };

    if (tokenData) {
      if (isExpired(tokenData.expireAt)) {
        onFailure();
      } else {
        callExtendTokenLifetime();
      }
    } else {
      processingRef.current = false;
      onSuccess();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [tokenData]);
}
