"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isServerError;

function isServerError(error) {
  var status = error.response && error.response.status;
  return status >= 500 && status < 600;
}