"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateLastUserTokenKey;

var _md = _interopRequireDefault(require("md5"));

function generateLastUserTokenKey(rawKey) {
  return (0, _md["default"])(rawKey.toLowerCase().trim());
}