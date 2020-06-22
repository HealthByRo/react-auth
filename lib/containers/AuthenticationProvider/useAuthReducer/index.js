"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useAuthReducer;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _getAuthDataFromStorage = _interopRequireDefault(require("../utils/getAuthDataFromStorage"));

var _reducer = _interopRequireDefault(require("./reducer"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var authDataInLocalStorage = (0, _getAuthDataFromStorage["default"])();

function useAuthReducer() {
  var _useReducer = (0, _react.useReducer)(_reducer["default"], {
    isReady: false,
    userWasAutoSignedOut: false,
    tokenData: (authDataInLocalStorage === null || authDataInLocalStorage === void 0 ? void 0 : authDataInLocalStorage.tokenData) || undefined
  }),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var actions = (0, _react.useMemo)(function () {
    return {
      clearAuthData: function clearAuthData() {
        return dispatch({
          type: 'clearAuthData'
        });
      },
      setAuthData: function setAuthData(authData) {
        return dispatch(_objectSpread({
          type: 'setAuthData'
        }, authData));
      },
      setIsReady: function setIsReady(isReady) {
        return dispatch({
          type: 'setIsReady',
          isReady: isReady
        });
      },
      setTokenData: function setTokenData(tokenData) {
        return dispatch({
          type: 'setTokenData',
          tokenData: tokenData
        });
      },
      setUserData: function setUserData(userData) {
        return dispatch({
          type: 'setUserData',
          userData: userData
        });
      },
      setUserWasAutoSignedOut: function setUserWasAutoSignedOut(userWasAutoSignedOut) {
        return dispatch({
          type: 'setUserWasAutoSignedOut',
          userWasAutoSignedOut: userWasAutoSignedOut
        });
      }
    };
  }, []);
  return [state, actions];
}