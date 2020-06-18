"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getLastTokenByEmail;

var _getAuthDataFromStorage = _interopRequireDefault(require("./getAuthDataFromStorage"));

var _generateLastUserTokenKey = _interopRequireDefault(require("./generateLastUserTokenKey"));

function getLastTokenByEmail(email) {
  var _store$lastTokens;

  var store = (0, _getAuthDataFromStorage["default"])();
  var lastUserTokenKey = (0, _generateLastUserTokenKey["default"])(email);
  return store === null || store === void 0 ? void 0 : (_store$lastTokens = store.lastTokens) === null || _store$lastTokens === void 0 ? void 0 : _store$lastTokens[lastUserTokenKey];
}