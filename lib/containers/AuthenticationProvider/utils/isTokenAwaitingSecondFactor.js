"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isTokenAwaitingSecondFactor;

var _constants = require("../constants");

function isTokenAwaitingSecondFactor(tokenData) {
  return Boolean(tokenData) && tokenData.status === _constants.TOKEN_STATUS_AWAITING_SECOND_FACTOR;
}