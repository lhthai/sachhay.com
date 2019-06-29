"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCategory = addCategory;
exports.updateCategory = updateCategory;
exports.removeCategory = removeCategory;
exports.categories = categories;
exports.categoryByCategoryUrl = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _category = _interopRequireDefault(require("../../model/category"));

var _book = _interopRequireDefault(require("../../model/book"));

var _this = void 0;

var getBooks =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(bookIds, page) {
    var books, count;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _book["default"].find({
              _id: {
                $in: bookIds
              }
            }).limit(20).skip(20 * (page - 1));

          case 3:
            books = _context.sent;
            _context.next = 6;
            return _book["default"].find({
              _id: {
                $in: bookIds
              }
            }).countDocuments();

          case 6:
            count = _context.sent;
            books.map(function (book) {
              return (0, _objectSpread2["default"])({}, book._doc, {
                id: book.id,
                category: getCategory.bind(_this, book.category)
              });
            });
            return _context.abrupt("return", {
              books: books,
              count: count
            });

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function getBooks(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getCategory =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(categoryId) {
    var category;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _category["default"].findById(categoryId);

          case 3:
            category = _context2.sent;
            return _context2.abrupt("return", (0, _objectSpread2["default"])({}, category._doc, {
              id: category.id,
              books: getBooks.bind(_this, category._doc.books)
            }));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getCategory(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var convertCategoryUrl = function convertCategoryUrl(name) {
  var str = name.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  str = str.replace(/\s+/g, '-');
  str = str.trim();
  return str;
};

function addCategory(_x4) {
  return _addCategory.apply(this, arguments);
}

function _addCategory() {
  _addCategory = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(args) {
    var category_url, _args$categoryInput, name, description, temp, newCategory;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            category_url = convertCategoryUrl(args.categoryInput.name);
            _args$categoryInput = args.categoryInput, name = _args$categoryInput.name, description = _args$categoryInput.description;
            _context4.next = 4;
            return _category["default"].findOne({
              name: name
            });

          case 4:
            temp = _context4.sent;

            if (!temp) {
              _context4.next = 9;
              break;
            }

            throw new Error("This category is already exist.");

          case 9:
            _context4.prev = 9;
            newCategory = new _category["default"]({
              name: name,
              description: description,
              category_url: category_url
            }, function (err) {
              if (err) throw err;
            });
            newCategory.save();
            return _context4.abrupt("return", newCategory);

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](9);
            throw _context4.t0;

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[9, 15]]);
  }));
  return _addCategory.apply(this, arguments);
}

function updateCategory(_x5) {
  return _updateCategory.apply(this, arguments);
}

function _updateCategory() {
  _updateCategory = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(args) {
    var updatedCategory;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _category["default"].findOneAndUpdate({
              _id: args.id
            }, args, {
              "new": true
            });

          case 3:
            updatedCategory = _context5.sent;
            return _context5.abrupt("return", (0, _objectSpread2["default"])({}, updatedCategory._doc, {
              id: updatedCategory.id,
              books: getBooks.bind(this, updatedCategory._doc.books)
            }));

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            throw _context5.t0;

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this, [[0, 7]]);
  }));
  return _updateCategory.apply(this, arguments);
}

function removeCategory(_x6) {
  return _removeCategory.apply(this, arguments);
}

function _removeCategory() {
  _removeCategory = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(args) {
    var removedCategory;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _category["default"].findByIdAndRemove({
              _id: args.id
            }).exec();

          case 3:
            removedCategory = _context6.sent;
            return _context6.abrupt("return", (0, _objectSpread2["default"])({}, removedCategory._doc, {
              id: removedCategory.id,
              books: getBooks.bind(this, removedCategory._doc.books)
            }));

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            throw _context6.t0;

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this, [[0, 7]]);
  }));
  return _removeCategory.apply(this, arguments);
}

function categories() {
  return _categories.apply(this, arguments);
}

function _categories() {
  _categories = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7() {
    var _this2 = this;

    var _categories2;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _category["default"].find();

          case 3:
            _categories2 = _context7.sent;
            return _context7.abrupt("return", _categories2.map(function (category) {
              return (0, _objectSpread2["default"])({}, category._doc, {
                id: category.id,
                books: getBooks.bind(_this2, category._doc.books)
              });
            }));

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return _categories.apply(this, arguments);
}

var categoryByCategoryUrl =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(args) {
    var category, booksArr;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _category["default"].findOne({
              category_url: args.category_url
            });

          case 3:
            category = _context3.sent;
            _context3.next = 6;
            return getBooks(category._doc.books, args.page);

          case 6:
            booksArr = _context3.sent;
            return _context3.abrupt("return", (0, _objectSpread2["default"])({}, category._doc, {
              id: category.id,
              books: booksArr.books,
              count: booksArr.count
            }));

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            throw _context3.t0;

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));

  return function categoryByCategoryUrl(_x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.categoryByCategoryUrl = categoryByCategoryUrl;