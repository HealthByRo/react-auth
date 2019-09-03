"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cancelTimer;

var _timer = require("./timer");

function cancelTimer() {
  clearTimeout((0, _timer.getTimer)());
  (0, _timer.setTimer)(null);
}