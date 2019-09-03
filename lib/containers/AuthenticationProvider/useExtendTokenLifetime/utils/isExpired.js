"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isExpired;

function isExpired(expireAt) {
  return new Date().getTime() - Date.parse(expireAt) >= 0;
}