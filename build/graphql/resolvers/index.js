"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var Book = _interopRequireWildcard(require("./book"));

var Category = _interopRequireWildcard(require("./category"));

var _default = (0, _objectSpread2["default"])({}, Book, Category);

exports["default"] = _default;