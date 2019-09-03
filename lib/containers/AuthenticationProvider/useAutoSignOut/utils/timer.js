"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTimer = setTimer;
exports.getTimer = getTimer;
var autoSignOutTimer;

function setTimer(timer) {
  autoSignOutTimer = timer;
}

function getTimer() {
  return autoSignOutTimer;
}