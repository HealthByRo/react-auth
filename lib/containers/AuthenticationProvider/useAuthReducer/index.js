"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useAuthReducer;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _getAuthDataFromStorage = _interopRequireDefault(require("../utils/getAuthDataFromStorage"));

var _reducer = _interopRequireDefault(require("./reducer"));

var authDataInLocalStorage = (0, _getAuthDataFromStorage["default"])();

function useAuthReducer() {
  var _useReducer = (0, _react.useReducer)(_reducer["default"], {
    isReady: false,
    userWasAutoSignedOut: false,
    tokenData: authDataInLocalStorage && authDataInLocalStorage.tokenData || undefined
  }),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  return [state, dispatch];
}