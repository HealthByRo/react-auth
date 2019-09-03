"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = storeLastUserToken;

var _getAuthDataFromStorage = _interopRequireDefault(require("./getAuthDataFromStorage"));

var _setAuthDataInStorage = _interopRequireDefault(require("./setAuthDataInStorage"));

function storeLastUserToken(key, token) {
  var currentAuthData = (0, _getAuthDataFromStorage["default"])();
  currentAuthData.lastTokens = currentAuthData.lastTokens || {};
  currentAuthData.lastTokens[key] = token;
  return (0, _setAuthDataInStorage["default"])(currentAuthData);
}