"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isTokenValid;

var _constants = require("../constants");

function isTokenValid(tokenData) {
  return tokenData.status === _constants.TOKEN_STATUS_VALID;
}