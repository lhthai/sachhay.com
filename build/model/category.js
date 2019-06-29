"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var categorySchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category_url: {
    type: String
  },
  books: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Book"
  }]
}, {
  timestamps: true
});

var Category = _mongoose["default"].model('Category', categorySchema);

var _default = Category;
exports["default"] = _default;