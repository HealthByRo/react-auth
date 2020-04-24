"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useReceiveUserData;

var _react = require("react");

function useReceiveUserData(userData, callback) {
  return (0, _react.useEffect)(function () {
    if (userData) {
      callback();
    }
  }, [userData]);
}