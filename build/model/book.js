"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var bookSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  thumbnail: {
    type: String
  },
  views: {
    type: Number,
    "default": 0
  },
  category: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Category"
  },
  book_url: {
    type: String
  },
  download_epub: String,
  download_mobi: String,
  download_pdf: String
}, {
  timestamps: true
});
bookSchema.index({
  title: 'text',
  author: 'text'
});

var Book = _mongoose["default"].model('Book', bookSchema);

var _default = Book;
exports["default"] = _default;