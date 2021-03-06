"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = AuthProvider;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _context = _interopRequireDefault(require("./context"));

var _isAuthenticated = _interopRequireDefault(require("./utils/isAuthenticated"));

var _isTokenAwaitingSecondFactor = _interopRequireDefault(require("./utils/isTokenAwaitingSecondFactor"));

var _resetTimer = _interopRequireDefault(require("./useAutoSignOut/utils/resetTimer"));

var _useExtendTokenLifetime = _interopRequireDefault(require("./useExtendTokenLifetime"));

var _useLocalStorageSync = _interopRequireDefault(require("./useLocalStorageSync"));

var _useApiClientSync = _interopRequireDefault(require("./useApiClientSync"));

var _useAutoSignOut = _interopRequireDefault(require("./useAutoSignOut"));

var _useIsUserAuthenticated = _interopRequireDefault(require("./useIsUserAuthenticated"));

var _useSignOutSync = _interopRequireDefault(require("./useSignOutSync"));

var _useAuthReducer3 = _interopRequireDefault(require("./useAuthReducer"));

var _getLastTokenByEmail = _interopRequireDefault(require("./utils/getLastTokenByEmail"));

var _debounce = _interopRequireDefault(require("./utils/debounce"));

function AuthProvider(props) {
  var _useAuthReducer = (0, _useAuthReducer3["default"])(),
      _useAuthReducer2 = (0, _slicedToArray2["default"])(_useAuthReducer, 2),
      _useAuthReducer2$ = _useAuthReducer2[0],
      featureFlags = _useAuthReducer2$.featureFlags,
      tokenData = _useAuthReducer2$.tokenData,
      userData = _useAuthReducer2$.userData,
      isReady = _useAuthReducer2$.isReady,
      userWasAutoSignedOut = _useAuthReducer2$.userWasAutoSignedOut,
      _useAuthReducer2$2 = _useAuthReducer2[1],
      clearAuthData = _useAuthReducer2$2.clearAuthData,
      setAuthData = _useAuthReducer2$2.setAuthData,
      setIsReady = _useAuthReducer2$2.setIsReady,
      setTokenData = _useAuthReducer2$2.setTokenData,
      setUserData = _useAuthReducer2$2.setUserData,
      setFeatureFlags = _useAuthReducer2$2.setFeatureFlags,
      setUserWasAutoSignedOut = _useAuthReducer2$2.setUserWasAutoSignedOut;

  var userIsAuthenticated = (0, _isAuthenticated["default"])(tokenData, userData);
  var tokenIsAwaitingSecondFactor = (0, _isTokenAwaitingSecondFactor["default"])(tokenData);
  var handleActivity = (0, _debounce["default"])(_resetTimer["default"], 300);

  var onExtendTokenLifeTimeSuccess = function onExtendTokenLifeTimeSuccess(authData) {
    if (authData) {
      setAuthData(authData);
    } else {
      setIsReady(true);
    }
  };

  var onAuthenticationSuccess = function onAuthenticationSuccess() {
    return setUserWasAutoSignedOut(false);
  };

  var onAutoSignoutSuccess = function onAutoSignoutSuccess() {
    setUserWasAutoSignedOut(true);
    clearAuthData();
  };

  (0, _useExtendTokenLifetime["default"])(tokenData, onExtendTokenLifeTimeSuccess, clearAuthData, isReady);
  (0, _useIsUserAuthenticated["default"])(userIsAuthenticated, onAuthenticationSuccess);
  (0, _useLocalStorageSync["default"])(tokenData, userData); // order of hooks is important
  // before removing auth token from apiClient using useApiClientSync
  // useSignOutSync must send request to server, which requires auth token

  (0, _useSignOutSync["default"])(userIsAuthenticated);
  (0, _useApiClientSync["default"])(tokenData);
  (0, _useAutoSignOut["default"])(userIsAuthenticated, onAutoSignoutSuccess);
  (0, _react.useDebugValue)(userIsAuthenticated ? 'Authenticated' : 'Not authenticated'); // Register event listeners on the window for activity tracking

  (0, _react.useEffect)(function () {
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('mousemove', handleActivity);
    return function () {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
    };
  }, []);
  return _react["default"].createElement(_context["default"].Provider, {
    value: {
      isAuthenticated: userIsAuthenticated,
      isAwaitingSecondFactor: tokenIsAwaitingSecondFactor,
      isReady: isReady,
      setTokenData: setTokenData,
      setUserData: setUserData,
      setAuthData: setAuthData,
      setFeatureFlags: setFeatureFlags,
      signOut: clearAuthData,
      getLastTokenByEmail: _getLastTokenByEmail["default"],
      tokenData: tokenData,
      userData: userData,
      featureFlags: featureFlags,
      userWasAutoSignedOut: userWasAutoSignedOut
    }
  }, props.children);
}