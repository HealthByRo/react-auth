"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setAuthDataInStorage;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _jsBase = require("js-base64");

var _getAuthDataFromStorage = _interopRequireDefault(require("./getAuthDataFromStorage"));

var _setItemInStorage = _interopRequireDefault(require("./setItemInStorage"));

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function setAuthDataInStorage(authData) {
  var currentAuthData = (0, _getAuthDataFromStorage["default"])();

  var mergedAuthData = _objectSpread({}, currentAuthData, {}, authData);

  var authDataAsString = JSON.stringify(mergedAuthData);

  var encodedAuthData = _jsBase.Base64.encode(authDataAsString).toString();

  return (0, _setItemInStorage["default"])(_constants.AUTH_KEY, encodedAuthData);
}