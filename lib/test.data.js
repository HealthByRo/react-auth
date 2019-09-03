"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stateAuthenticated = exports.tokenAndUserDataResponse = exports.tokenAndUserData = exports.userData = exports.validTokenData = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var validTokenData = {
  expireAt: '2017-11-08T07:08:17.333781Z',
  key: '16333dfefa35b48a242801aced4925dd93d0ab84',
  status: 'valid'
};
exports.validTokenData = validTokenData;
var userData = {
  email: 'test@test.com',
  id: 10
};
exports.userData = userData;
var tokenAndUserData = {
  userData: userData,
  tokenData: validTokenData
};
exports.tokenAndUserData = tokenAndUserData;
var tokenAndUserDataResponse = {
  data: _objectSpread({}, tokenAndUserData)
};
exports.tokenAndUserDataResponse = tokenAndUserDataResponse;
var stateAuthenticated = {
  auth: {
    isReady: true,
    tokenData: validTokenData,
    userData: userData
  }
};
exports.stateAuthenticated = stateAuthenticated;