"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = removeAuthDataFromStorage;

var _constants = require("../constants");

function removeAuthDataFromStorage() {
  try {
    localStorage.removeItem(_constants.AUTH_KEY);
    return true;
  } catch (e) {
    return false;
  }
}