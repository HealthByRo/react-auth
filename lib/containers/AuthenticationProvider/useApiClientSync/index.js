"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useApiClientSync;

var _react = require("react");

var _api = require("../../../api");

var _isTokenAwaitingSecondFactor = _interopRequireDefault(require("../utils/isTokenAwaitingSecondFactor"));

function useApiClientSync(tokenData) {
  return (0, _react.useEffect)(function () {
    if (Boolean(tokenData) && !(0, _isTokenAwaitingSecondFactor["default"])(tokenData)) {
      (0, _api.setAuthorizationTokenInHeaders)(tokenData.key);
    } else {
      (0, _api.removeAuthorizationTokenInHeaders)();
    }
  }, [tokenData]);
}