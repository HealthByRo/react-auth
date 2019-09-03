"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = calculateExpiryTime;

function calculateExpiryTime(expireAt) {
  var NOW = new Date().getTime();
  var expires = Date.parse(expireAt);
  var expiresEarlierBy = 60 * 1000;
  return expires - NOW - expiresEarlierBy;
}