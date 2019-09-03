"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setLastActive;

var _setItemInStorage = _interopRequireDefault(require("../../utils/setItemInStorage"));

var _constants = require("../../constants");

function setLastActive(value) {
  return (0, _setItemInStorage["default"])(_constants.LAST_ACTIVE_KEY, value);
}