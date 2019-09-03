"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isUserActive;

var _config = _interopRequireDefault(require("../../../../config"));

var _getLastActive = _interopRequireDefault(require("./getLastActive"));

function isUserActive() {
  var lastActive = (0, _getLastActive["default"])();

  var autoSignOutAt = new Date().getTime() - _config["default"].autoSignOutWithin;

  return Boolean(lastActive && lastActive > autoSignOutAt);
}