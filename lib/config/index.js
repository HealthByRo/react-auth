"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.setConfig = void 0;
var config = {
  redirectPathAfterSignOut: '/sign-in',
  signInConfirmCodePageUrl: '/sign-in-confirm-code',
  adminRole: '20_example_admin',
  camelizeUserDataKeys: true,
  autoSignOutWithin: false,
  recaptchaSiteKey: undefined,
  successAuthenticationResponseSaga: undefined,
  failedAuthenticationResponseSaga: undefined
};

var setConfig = function setConfig(newConfig) {
  Object.assign(config, newConfig);
};

exports.setConfig = setConfig;
var _default = config;
exports["default"] = _default;