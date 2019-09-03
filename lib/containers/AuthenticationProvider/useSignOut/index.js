"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useSignOut;

function useSignOut(setTokenData, setUserData) {
  return function () {
    setTokenData(null);
    setUserData(null);
  };
}