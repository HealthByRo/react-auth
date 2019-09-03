"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getTimeToAutoSignOut;

var _config = _interopRequireDefault(require("../../../../config"));

var _getLastActive = _interopRequireDefault(require("./getLastActive"));

/**
* Function calculates time to auto sign out (in ms) based on last active time.
* Thanks to this each tab will be signed out at the same time.
*/
function getTimeToAutoSignOut() {
  var lastActive = (0, _getLastActive["default"])();

  if (lastActive) {
    var expireWithinMs = _config["default"].autoSignOutWithin - (new Date().getTime() - lastActive);
    return Math.max(0, expireWithinMs);
  }

  return _config["default"].autoSignOutWithin;
}