"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getLastActive;

var _getItemFromStorage = _interopRequireDefault(require("../../utils/getItemFromStorage"));

var _constants = require("../../constants");

function getLastActive() {
  return (0, _getItemFromStorage["default"])(_constants.LAST_ACTIVE_KEY);
}