"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useExtendTokenLifetime;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = require("react");

var _extendTokenLifetime = _interopRequireDefault(require("./extendTokenLifetime"));

var _calculateExpiryTime = _interopRequireDefault(require("./utils/calculateExpiryTime"));

var _isExpired = _interopRequireDefault(require("./utils/isExpired"));

var _wait = _interopRequireDefault(require("./utils/wait"));

function useExtendTokenLifetime(tokenData, onSuccess, onFailure, isReady) {
  var processingRef = (0, _react.useRef)(false);
  var mountedRef = (0, _react.useRef)(true);
  (0, _react.useEffect)(function () {
    mountedRef.current = true;

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
                if (processingRef.current) {
                  _context.next = 18;
                  break;
                }

                processingRef.current = true;
                _context.prev = 2;

                if (!isReady) {
                  _context.next = 7;
                  break;
                }

                expiryTime = (0, _calculateExpiryTime["default"])(tokenData.expireAt);
                _context.next = 7;
                return (0, _wait["default"])(expiryTime);

              case 7:
                _context.next = 9;
                return (0, _extendTokenLifetime["default"])(tokenData);

              case 9:
                response = _context.sent;
                processingRef.current = false;
                onSuccess(response.data);
                _context.next = 18;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](2);
                processingRef.current = false;
                onFailure(_context.t0);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 14]]);
      }));

      return function callExtendTokenLifetime() {
        return _ref.apply(this, arguments);
      };
    }();

    if (tokenData) {
      if ((0, _isExpired["default"])(tokenData.expireAt)) {
        onFailure();
      } else {
        callExtendTokenLifetime();
      }
    } else {
      processingRef.current = false;
      onSuccess();
    }

    return function () {
      mountedRef.current = false;
    };
  }, [tokenData]);
}