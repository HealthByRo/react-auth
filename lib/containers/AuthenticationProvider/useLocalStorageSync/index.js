"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useLocalStorageSync;

var _react = require("react");

var _setAuthDataInStorage = _interopRequireDefault(require("../utils/setAuthDataInStorage"));

var _storeLastUserToken = _interopRequireDefault(require("../utils/storeLastUserToken"));

var _generateLastUserTokenKey = _interopRequireDefault(require("../utils/generateLastUserTokenKey"));

var _removeAuthDataFromStorage = _interopRequireDefault(require("../utils/removeAuthDataFromStorage"));

function useLocalStorageSync(tokenData, userData) {
  return (0, _react.useEffect)(function () {
    (0, _setAuthDataInStorage["default"])({
      tokenData: tokenData
    }); // if (!tokenData) {
    //   removeAuthDataFromStorage();
    // }

    if (tokenData && userData) {
      var lastUserTokenKey = (0, _generateLastUserTokenKey["default"])(userData.email);
      (0, _storeLastUserToken["default"])(lastUserTokenKey, tokenData.key);
    }
  }, [tokenData, userData]);
}