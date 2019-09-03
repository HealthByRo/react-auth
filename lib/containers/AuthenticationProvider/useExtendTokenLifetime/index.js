"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useExtendTokenLifetime;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _extendTokenLifetime = _interopRequireDefault(require("./extendTokenLifetime"));

var _calculateExpiryTime = _interopRequireDefault(require("./utils/calculateExpiryTime"));

var _isExpired = _interopRequireDefault(require("./utils/isExpired"));

function useExtendTokenLifetime(tokenData, onSuccess, onFailure) {
  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      isReady = _useState2[0],
      setIsReady = _useState2[1];

  (0, _react.useEffect)(function () {
    var unmounted = false;

    var switchToReady = function switchToReady() {
      if (!unmounted && !isReady) {
        setIsReady(true);
      }
    };

    var callExtendTokenLifetime =
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var response, expiryTime;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return (0, _extendTokenLifetime["default"])(tokenData.key);

              case 3:
                response = _context.sent;
                expiryTime = (0, _calculateExpiryTime["default"])(response.tokenData.expireAt);
                onSuccess(response);
                setTimeout(callExtendTokenLifetime, expiryTime);
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                onFailure(_context.t0);

              case 12:
                _context.prev = 12;
                switchToReady();
                return _context.finish(12);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9, 12, 15]]);
      }));

      return function callExtendTokenLifetime() {
        return _ref.apply(this, arguments);
      };
    }();

    if (tokenData && !(0, _isExpired["default"])(tokenData.expireAt)) {
      callExtendTokenLifetime();
    } else {
      switchToReady();
    }

    return function () {
      unmounted = true;
    };
  }, [tokenData]);
  return [isReady];
}