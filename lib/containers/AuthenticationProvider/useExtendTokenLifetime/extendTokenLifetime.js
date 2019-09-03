"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = extendTokenLifetime;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _api = require("../../../api");

var _isExpired = _interopRequireDefault(require("./utils/isExpired"));

var _wait = _interopRequireDefault(require("./utils/wait"));

var _isNoInternetConnectionError = _interopRequireDefault(require("./utils/isNoInternetConnectionError"));

var _isServerError = _interopRequireDefault(require("./utils/isServerError"));

/* eslint-disable no-await-in-loop */
function extendTokenLifetime(_x) {
  return _extendTokenLifetime.apply(this, arguments);
}

function _extendTokenLifetime() {
  _extendTokenLifetime = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(tokenData) {
    var response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _api.extendTokenLifetime)(tokenData.key);

          case 3:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

            if (!(!(0, _isNoInternetConnectionError["default"])(_context.t0) && !(0, _isServerError["default"])(_context.t0))) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("break", 14);

          case 11:
            _context.next = 13;
            return (0, _wait["default"])(5000);

          case 13:
            if (!(0, _isExpired["default"])(tokenData.expireAt)) {
              _context.next = 0;
              break;
            }

          case 14:
            throw Error('Token expired');

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _extendTokenLifetime.apply(this, arguments);
}