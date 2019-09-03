"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getAuthDataFromStorage;

var _jsBase = require("js-base64");

var _constants = require("../constants");

var _getItemFromStorage = _interopRequireDefault(require("./getItemFromStorage"));

function getAuthDataFromStorage() {
  var localStorageItem = (0, _getItemFromStorage["default"])(_constants.AUTH_KEY);

  if (localStorageItem) {
    try {
      var decodedLocalStorageItem = _jsBase.Base64.decode(localStorageItem);

      return JSON.parse(decodedLocalStorageItem);
    } catch (e) {
      return null;
    }
  }

  return localStorageItem;
}