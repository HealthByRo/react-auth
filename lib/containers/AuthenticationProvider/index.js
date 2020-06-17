"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = AuthProvider;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function AuthProvider(props) {
  var _useAuthReducer = (0, _useAuthReducer3["default"])(),
      _useAuthReducer2 = (0, _slicedToArray2["default"])(_useAuthReducer, 2),
      _useAuthReducer2$ = _useAuthReducer2[0],
      tokenData = _useAuthReducer2$.tokenData,
      userData = _useAuthReducer2$.userData,
      isReady = _useAuthReducer2$.isReady,
      userWasAutoSignedOut = _useAuthReducer2$.userWasAutoSignedOut,
      dispatch = _useAuthReducer2[1];

  var userIsAuthenticated = (0, _isAuthenticated["default"])(tokenData, userData);
  var tokenIsAwaitingSecondFactor = (0, _isTokenAwaitingSecondFactor["default"])(tokenData);

  var clearAuthData = function clearAuthData() {
    return dispatch({
      type: 'clearAuthData'
    });
  };

  var setAuthData = function setAuthData(authData) {
    return dispatch(_objectSpread({
      type: 'setAuthData'
    }, authData));
  };

  var setIsReady = function setIsReady(_isReady) {
    return dispatch({
      type: 'setIsReady',
      isReady: _isReady
    });
  };

  var setTokenData = function setTokenData(_tokenData) {
    return dispatch({
      type: 'setTokenData',
      tokenData: _tokenData
    });
  };

  var setUserData = function setUserData(_userData) {
    return dispatch({
      type: 'setUserData',
      userData: _userData
    });
  };

  var setUserWasAutoSignedOut = function setUserWasAutoSignedOut(_userWasAutoSignedOut) {
    return dispatch({
      type: 'setUserWasAutoSignedOut',
      userWasAutoSignedOut: _userWasAutoSignedOut
    });
  };

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
  (0, _react.useDebugValue)(userIsAuthenticated ? 'Authenticated' : 'Not authenticated');
  return _react["default"].createElement(_context["default"].Provider, {
    value: {
      isAuthenticated: userIsAuthenticated,
      isAwaitingSecondFactor: tokenIsAwaitingSecondFactor,
      isReady: isReady,
      setTokenData: setTokenData,
      setUserData: setUserData,
      setAuthData: setAuthData,
      signOut: clearAuthData,
      tokenData: tokenData,
      userData: userData,
      userWasAutoSignedOut: userWasAutoSignedOut
    }
  }, _react["default"].createElement("div", {
    onClick: _resetTimer["default"],
    onKeyPress: _resetTimer["default"],
    role: "button",
    tabIndex: "0"
  }, props.children));
}