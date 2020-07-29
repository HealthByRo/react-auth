export default function reducer(state, action) {
  switch (action.type) {
    case 'setTokenData':
      return {
        ...state,
        tokenData: action.tokenData,
      };
    case 'setUserData':
      return {
        ...state,
        userData: action.userData,
      };
    case 'setAuthData':
      if (action.userData && action.tokenData) {
        return {
          ...state,
          isReady: true,
          userData: action.userData,
          tokenData: action.tokenData,
          featureFlags: new Set(action.featureFlags || []),
        };
      }

      return {
        ...state,
        isReady: true,
      };
    case 'setIsReady':
      return {
        ...state,
        isReady: action.isReady,
      };
    case 'clearAuthData':
      return {
        ...state,
        userData: null,
        tokenData: null,
        featureFlags: new Set([]),
        userWasAutoSignedOut: action.userWasAutoSignedOut,
      };
    case 'setUserWasAutoSignedOut':
      return {
        ...state,
        userWasAutoSignedOut: action.userWasAutoSignedOut,
      };
    case 'setFeatureFlags':
      return {
        ...state,
        featureFlags: new Set(action.featureFlags),
      };
    default:
      throw new Error();
  }
}
