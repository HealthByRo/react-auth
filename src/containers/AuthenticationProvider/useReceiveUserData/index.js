import { useEffect } from 'react';

export default function useReceiveUserData(userData, callback) {
  return useEffect(() => {
    if (userData) {
      callback();
    }
  }, [userData]);
}
