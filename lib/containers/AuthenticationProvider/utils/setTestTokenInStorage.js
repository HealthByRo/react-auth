"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authDataInLocalStorage = void 0;

var _setAuthDataInStorage = _interopRequireDefault(require("./setAuthDataInStorage"));

var authDataInLocalStorage = {
  key: 'TOKEN_KEY'
};
exports.authDataInLocalStorage = authDataInLocalStorage;
(0, _setAuthDataInStorage["default"])(authDataInLocalStorage);