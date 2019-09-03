"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = runTimer;

var _isUserActive = _interopRequireDefault(require("./isUserActive"));

var _getTimeToAutoSignOut = _interopRequireDefault(require("./getTimeToAutoSignOut"));

var _cancelTimer = _interopRequireDefault(require("./cancelTimer"));

var _timer = require("./timer");

function runTimer(onCancel) {
  var timer = setTimeout(function () {
    if ((0, _isUserActive["default"])()) {
      runTimer(onCancel);
    } else {
      (0, _cancelTimer["default"])();
      onCancel();
    }
  }, (0, _getTimeToAutoSignOut["default"])());
  (0, _timer.setTimer)(timer);
}