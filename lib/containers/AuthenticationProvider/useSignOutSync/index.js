"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useSignOutSync;

var _react = require("react");

var _api = require("../../../api");

function useSignOutSync(isAuthenticated) {
  return (0, _react.useEffect)(function () {
    if (isAuthenticated) {
      (0, _api.signOut)()["catch"](function () {// TODO what to do on fail?
      });
    }
  }, [isAuthenticated]);
}