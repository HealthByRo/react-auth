"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useAuthResponseCallback;

var _react = require("react");

function useAuthResponseCallback(existingTokenData, existingUserData, setTokenData, setUserData) {
  return (0, _react.useCallback)(function (response) {
    var _response$data = response.data,
        tokenData = _response$data.tokenData,
        userData = _response$data.userData;
    setTokenData(tokenData);
    setUserData(userData);
  }, [existingTokenData, existingUserData]);
}