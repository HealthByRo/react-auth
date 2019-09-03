"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setItemInStorage;

function setItemInStorage(key, value) {
  try {
    var serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (e) {
    return false;
  }
}