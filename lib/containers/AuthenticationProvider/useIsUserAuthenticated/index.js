"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useIsUserAuthenticated;

var _react = require("react");

function useIsUserAuthenticated(userIsAuthenticated, authenticatedCallback) {
  return (0, _react.useEffect)(function () {
    if (userIsAuthenticated) {
      authenticatedCallback();
    }
  }, [userIsAuthenticated]);
}