import { useReducer } from 'react';
import getAuthDataFromStorage from '../utils/getAuthDataFromStorage';
import reducer from './reducer';

const authDataInLocalStorage = getAuthDataFromStorage();

export default function useAuthReducer() {
  const [state, dispatch] = useReducer(reducer, {
    isReady: false,
    userWasAutoSignedOut: false,
    tokenData: (authDataInLocalStorage && authDataInLocalStorage.tokenData) || undefined,
  });

  return [state, dispatch];
}
