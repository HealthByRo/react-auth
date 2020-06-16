"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = reducer;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function reducer(state, action) {
  switch (action.type) {
    case 'setTokenData':
      return _objectSpread({}, state, {
        tokenData: action.tokenData
      });

    case 'setUserData':
      return _objectSpread({}, state, {
        userData: action.userData
      });

    case 'setAuthData':
      if (action.userData && action.tokenData) {
        return _objectSpread({}, state, {
          isReady: true,
          userData: action.userData,
          tokenData: action.tokenData
        });
      }

      return _objectSpread({}, state, {
        isReady: true
      });

    case 'setIsReady':
      return _objectSpread({}, state, {
        isReady: action.isReady
      });

    case 'clearAuthData':
      return _objectSpread({}, state, {
        userData: null,
        tokenData: null,
        userWasAutoSignedOut: action.userWasAutoSignedOut
      });

    case 'setUserWasAutoSignedOut':
      return _objectSpread({}, state, {
        userWasAutoSignedOut: action.userWasAutoSignedOut
      });

    default:
      throw new Error();
  }
}