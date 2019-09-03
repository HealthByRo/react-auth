"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useApiClientSync;

var _react = require("react");

var _api = require("../../../api");

function useApiClientSync(tokenData) {
  return (0, _react.useEffect)(function () {
    if (tokenData) {
      (0, _api.setAuthorizationTokenInHeaders)(tokenData.key);
    } else {
      (0, _api.removeAuthorizationTokenInHeaders)();
    }
  }, [tokenData]);
}