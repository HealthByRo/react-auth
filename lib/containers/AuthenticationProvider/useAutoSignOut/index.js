"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useAutoSignOut;

var _react = require("react");

var _config = _interopRequireDefault(require("../../../config"));

var _cancelTimer = _interopRequireDefault(require("./utils/cancelTimer"));

var _setLastActive = _interopRequireDefault(require("./utils/setLastActive"));

var _runTimer = _interopRequireDefault(require("./utils/runTimer"));

function useAutoSignOut(isAuthenticated, signOut) {
  (0, _react.useEffect)(function () {
    if (_config["default"].autoSignOutWithin) {
      if (isAuthenticated) {
        (0, _setLastActive["default"])(new Date().getTime());
        (0, _runTimer["default"])(signOut);
      } else {
        (0, _cancelTimer["default"])();
      }
    }
  }, [isAuthenticated]);
  (0, _react.useEffect)(function () {
    return _cancelTimer["default"];
  }, []);
}