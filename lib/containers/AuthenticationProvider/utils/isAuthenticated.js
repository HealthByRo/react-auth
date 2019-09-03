"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isAuthenticated;

var _isTokenValid = _interopRequireDefault(require("./isTokenValid"));

function isAuthenticated(tokenData, userData) {
  return Boolean(tokenData && userData) && (0, _isTokenValid["default"])(tokenData);
}