"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = calculateExtendTokenWithinMs;
exports.EXTEND_BEFORE_AUTO_SIGN_OUT_TIME = void 0;

var _calculateExpiryTime = _interopRequireDefault(require("./calculateExpiryTime"));

var EXTEND_BEFORE_AUTO_SIGN_OUT_TIME = 30 * 1000;
exports.EXTEND_BEFORE_AUTO_SIGN_OUT_TIME = EXTEND_BEFORE_AUTO_SIGN_OUT_TIME;

function calculateExtendTokenWithinMs(expireAt, autoSignOutWithin) {
  var tokenExpireInMs = (0, _calculateExpiryTime["default"])(expireAt);

  if (autoSignOutWithin) {
    return Math.min(tokenExpireInMs, autoSignOutWithin - EXTEND_BEFORE_AUTO_SIGN_OUT_TIME);
  }

  return tokenExpireInMs;
}