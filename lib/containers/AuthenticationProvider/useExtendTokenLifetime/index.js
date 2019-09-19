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

var _wait = _interopRequireDefault(require("./utils/wait"));

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
        var expiryTime, response;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!tokenData) {
                  _context.next = 10;
                  break;
                }

                if (!isReady) {
                  _context.next = 6;
                  break;
                }

                expiryTime = (0, _calculateExpiryTime["default"])(tokenData.expireAt);
                _context.next = 6;
                return (0, _wait["default"])(expiryTime);

              case 6:
                _context.next = 8;
                return (0, _extendTokenLifetime["default"])(tokenData.key);

              case 8:
                response = _context.sent;
                onSuccess(response);

              case 10:
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);
                onFailure(_context.t0);

              case 15:
                _context.prev = 15;
                switchToReady();
                return _context.finish(15);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 12, 15, 18]]);
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