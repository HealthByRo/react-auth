"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getItemFromStorage;

function getItemFromStorage(key) {
  try {
    var serializedValue = localStorage.getItem(key);
    return JSON.parse(serializedValue);
  } catch (e) {
    return undefined;
  }
}