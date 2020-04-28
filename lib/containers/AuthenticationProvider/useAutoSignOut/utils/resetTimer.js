"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = resetTimer;

var _setLastActive = _interopRequireDefault(require("./setLastActive"));

var _timer = require("./timer");

function resetTimer() {
  if ((0, _timer.getTimer)()) {
    (0, _setLastActive["default"])(new Date().getTime());
  }
}