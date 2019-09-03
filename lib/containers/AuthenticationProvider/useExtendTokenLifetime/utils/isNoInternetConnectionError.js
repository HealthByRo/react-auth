"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isNoInternetConnectionError;

function isNoInternetConnectionError(error) {
  return !error.response;
}