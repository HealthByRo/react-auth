"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendTokenLifetime = extendTokenLifetime;
exports.signOut = signOut;
exports.setAuthorizationTokenInHeaders = setAuthorizationTokenInHeaders;
exports.removeAuthorizationTokenInHeaders = removeAuthorizationTokenInHeaders;

var _apiClient = _interopRequireWildcard(require("api-client"));

function extendTokenLifetime(token) {
  var config = {
    headers: {
      Authorization: "Token ".concat(token)
    }
  };
  return _apiClient["default"].post('/auth/token/extend-lifetime', {}, config);
}

function signOut() {
  return _apiClient["default"].post('/auth/logout');
}

function setAuthorizationTokenInHeaders(token) {
  (0, _apiClient.setHeaders)({
    Authorization: "Token ".concat(token)
  });
}

function removeAuthorizationTokenInHeaders() {
  delete _apiClient["default"].defaults.headers.Authorization;
}