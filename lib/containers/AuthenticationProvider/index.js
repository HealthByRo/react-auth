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

var _useReceiveUserData = _interopRequireDefault(require("./useReceiveUserData"));

var _useSignOutSync = _interopRequireDefault(require("./useSignOutSync"));

var _useSignOut = _interopRequireDefault(require("./useSignOut"));

var _useAuthResponseCallback = _interopRequireDefault(require("./useAuthResponseCallback"));

var _getAuthDataFromStorage = _interopRequireDefault(require("./utils/getAuthDataFromStorage"));

var authDataInLocalStorage = (0, _getAuthDataFromStorage["default"])();

function AuthProvider(props) {
  var _useState = (0, _react.useState)(authDataInLocalStorage && authDataInLocalStorage.tokenData),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      tokenData = _useState2[0],
      setTokenData = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      userData = _useState4[0],
      setUserData = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      userWasAutoSignedOut = _useState6[0],
      setUserWasAutoSignedOut = _useState6[1];

  var userIsAuthenticated = (0, _isAuthenticated["default"])(tokenData, userData);
  var tokenIsAwaitingSecondFactor = (0, _isTokenAwaitingSecondFactor["default"])(tokenData);
  var authResponseCallback = (0, _useAuthResponseCallback["default"])(tokenData, userData, setTokenData, setUserData);
  var signOut = (0, _useSignOut["default"])(setTokenData, setUserData);

  var _useExtendTokenLifeti = (0, _useExtendTokenLifetime["default"])(tokenData, authResponseCallback, signOut),
      _useExtendTokenLifeti2 = (0, _slicedToArray2["default"])(_useExtendTokenLifeti, 1),
      isReady = _useExtendTokenLifeti2[0];

  (0, _useReceiveUserData["default"])(userData, function () {
    setUserWasAutoSignedOut(false);
  });
  (0, _useLocalStorageSync["default"])(tokenData, userData); // order of hooks is important
  // before removing auth token from apiClient using useApiClientSync
  // useSignOutSync must send request to server, which requires auth token

  (0, _useSignOutSync["default"])(userIsAuthenticated);
  (0, _useApiClientSync["default"])(tokenData);
  (0, _useAutoSignOut["default"])(userIsAuthenticated, function () {
    setUserWasAutoSignedOut(true);
    signOut();
  });
  (0, _react.useDebugValue)(userIsAuthenticated ? 'Authenticated' : 'Not authenticated');
  return _react["default"].createElement(_context["default"].Provider, {
    value: {
      isAuthenticated: userIsAuthenticated,
      isAwaitingSecondFactor: tokenIsAwaitingSecondFactor,
      isReady: isReady,
      setTokenData: setTokenData,
      setUserData: setUserData,
      signOut: signOut,
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