"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  AuthenticationProvider: true,
  Context: true,
  useAuthContext: true,
  removeAuthorizationTokenInHeaders: true,
  setConfig: true
};
Object.defineProperty(exports, "AuthenticationProvider", {
  enumerable: true,
  get: function get() {
    return _AuthenticationProvider["default"];
  }
});
Object.defineProperty(exports, "Context", {
  enumerable: true,
  get: function get() {
    return _context["default"];
  }
});
Object.defineProperty(exports, "useAuthContext", {
  enumerable: true,
  get: function get() {
    return _useAuthContext["default"];
  }
});
Object.defineProperty(exports, "removeAuthorizationTokenInHeaders", {
  enumerable: true,
  get: function get() {
    return _api.removeAuthorizationTokenInHeaders;
  }
});
Object.defineProperty(exports, "setConfig", {
  enumerable: true,
  get: function get() {
    return _config.setConfig;
  }
});
exports["default"] = void 0;

var _AuthenticationProvider = _interopRequireDefault(require("./containers/AuthenticationProvider"));

var _context = _interopRequireDefault(require("./containers/AuthenticationProvider/context"));

var _useAuthContext = _interopRequireDefault(require("./containers/AuthenticationProvider/useAuthContext"));

var _api = require("./api");

var _config = require("./config");

var _constants = require("./containers/AuthenticationProvider/constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _constants[key];
    }
  });
});
var _default = _AuthenticationProvider["default"];
exports["default"] = _default;