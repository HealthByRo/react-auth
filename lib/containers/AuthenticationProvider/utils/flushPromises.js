"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = flushPromises;

function flushPromises() {
  return new Promise(function (resolve) {
    return setImmediate(resolve);
  });
}