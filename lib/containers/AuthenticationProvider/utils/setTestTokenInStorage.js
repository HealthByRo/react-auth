"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenDataInLocalStorage = void 0;

var _setAuthDataInStorage = _interopRequireDefault(require("./setAuthDataInStorage"));

var tokenDataInLocalStorage = {
  key: 'TOKEN_KEY'
};
exports.tokenDataInLocalStorage = tokenDataInLocalStorage;
(0, _setAuthDataInStorage["default"])(tokenDataInLocalStorage);