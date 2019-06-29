"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addBook = addBook;
exports.updateBook = updateBook;
exports.removeBook = removeBook;
exports.books = books;
exports.bookByBookUrl = bookByBookUrl;
exports.searchBooks = searchBooks;
exports.crawlBooks = crawlBooks;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _book = _interopRequireDefault(require("../../model/book"));

var _category = _interopRequireDefault(require("../../model/category"));

var _axios = _interopRequireDefault(require("axios"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _this = void 0;

var getBooks =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(bookIds) {
    var _books;

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
            });

          case 3:
            _books = _context.sent;

            _books.map(function (book) {
              return (0, _objectSpread2["default"])({}, book._doc, {
                id: book.id,
                category: getCategory.bind(_this, book.category)
              });
            });

            return _context.abrupt("return", _books);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function getBooks(_x) {
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

  return function getCategory(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var convertBookUrl = function convertBookUrl(title, author) {
  var str = (title + " " + author).toLowerCase();
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

function addBook(_x3) {
  return _addBook.apply(this, arguments);
}

function _addBook() {
  _addBook = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(args) {
    var book_url, book, checkBook, createdBook, result, category;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            book_url = convertBookUrl(args.bookInput.title, args.bookInput.author);
            book = new _book["default"]({
              title: args.bookInput.title,
              author: args.bookInput.author,
              thumbnail: args.bookInput.thumbnail,
              category: args.bookInput.category,
              book_url: book_url
            });
            _context3.next = 4;
            return _book["default"].findOne({
              $and: [{
                title: book.title
              }, {
                category: book.category
              }]
            });

          case 4:
            checkBook = _context3.sent;

            if (!checkBook) {
              _context3.next = 9;
              break;
            }

            throw new Error("This book is already exist.");

          case 9:
            _context3.prev = 9;
            _context3.next = 12;
            return book.save();

          case 12:
            result = _context3.sent;
            createdBook = (0, _objectSpread2["default"])({}, result._doc, {
              id: result._doc._id.toString(),
              category: getCategory.bind(this, result._doc.category)
            });
            _context3.next = 16;
            return _category["default"].findById(book.category);

          case 16:
            category = _context3.sent;

            if (category) {
              _context3.next = 19;
              break;
            }

            throw new Error("Category not found.");

          case 19:
            category.books.push(book);
            _context3.next = 22;
            return category.save();

          case 22:
            return _context3.abrupt("return", createdBook);

          case 25:
            _context3.prev = 25;
            _context3.t0 = _context3["catch"](9);
            throw _context3.t0;

          case 28:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[9, 25]]);
  }));
  return _addBook.apply(this, arguments);
}

function updateBook(_x4) {
  return _updateBook.apply(this, arguments);
}

function _updateBook() {
  _updateBook = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(args) {
    var updatedBook;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _book["default"].findOneAndUpdate({
              _id: args.id
            }, args, {
              "new": true
            });

          case 3:
            updatedBook = _context4.sent;
            return _context4.abrupt("return", (0, _objectSpread2["default"])({}, updatedBook._doc, {
              id: updatedBook.id,
              category: getCategory.bind(this, updatedBook._doc.category)
            }));

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            throw _context4.t0;

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 7]]);
  }));
  return _updateBook.apply(this, arguments);
}

function removeBook(_x5) {
  return _removeBook.apply(this, arguments);
}

function _removeBook() {
  _removeBook = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(args) {
    var removedBook;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _book["default"].findByIdAndRemove({
              _id: args.id
            }).exec();

          case 3:
            removedBook = _context5.sent;
            return _context5.abrupt("return", (0, _objectSpread2["default"])({}, removedBook._doc, {
              id: removedBook.id,
              category: getCategory.bind(this, removedBook._doc.category)
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
  return _removeBook.apply(this, arguments);
}

function books(_x6) {
  return _books2.apply(this, arguments);
}

function _books2() {
  _books2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(args) {
    var _this2 = this;

    var _books3;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _book["default"].find().limit(20).skip(20 * args.page).exec();

          case 3:
            _books3 = _context6.sent;
            return _context6.abrupt("return", _books3.map(function (book) {
              return (0, _objectSpread2["default"])({}, book._doc, {
                id: book.id,
                category: getCategory.bind(_this2, book._doc.category)
              });
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
    }, _callee6, null, [[0, 7]]);
  }));
  return _books2.apply(this, arguments);
}

function bookByBookUrl(_x7) {
  return _bookByBookUrl.apply(this, arguments);
}

function _bookByBookUrl() {
  _bookByBookUrl = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(args) {
    var book;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _book["default"].findOne({
              book_url: args.book_url
            });

          case 3:
            book = _context7.sent;
            return _context7.abrupt("return", (0, _objectSpread2["default"])({}, book._doc, {
              id: book.id,
              category: getCategory.bind(this, book._doc.category)
            }));

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            throw _context7.t0;

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this, [[0, 7]]);
  }));
  return _bookByBookUrl.apply(this, arguments);
}

function searchBooks(_x8) {
  return _searchBooks.apply(this, arguments);
}

function _searchBooks() {
  _searchBooks = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(args) {
    var _this3 = this;

    var _books4;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _book["default"].find({
              $text: {
                $search: args.query
              }
            }).limit(20).skip(20 * (args.page - 1));

          case 3:
            _books4 = _context8.sent;
            return _context8.abrupt("return", _books4.map(function (book) {
              return (0, _objectSpread2["default"])({}, book._doc, {
                id: book.id,
                category: getCategory.bind(_this3, book._doc.category)
              });
            }));

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            throw _context8.t0;

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return _searchBooks.apply(this, arguments);
}

function crawlBooks(_x9) {
  return _crawlBooks.apply(this, arguments);
}

function _crawlBooks() {
  _crawlBooks = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9(args) {
    var booksResult, listBooks, i, item, book, checkBook, category;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            booksResult = [];
            _context9.next = 4;
            return getBooksInfo(args.url);

          case 4:
            listBooks = _context9.sent;
            i = 0;

          case 6:
            if (!(i < listBooks.length)) {
              _context9.next = 28;
              break;
            }

            _context9.next = 9;
            return listBooks[i];

          case 9:
            item = _context9.sent;
            book = new _book["default"]({
              title: item.title,
              author: item.author,
              thumbnail: item.thumbnail,
              book_url: item.book_url,
              category: args.category,
              download_epub: item.download_epub,
              download_mobi: item.download_mobi,
              download_pdf: item.download_pdf
            });
            _context9.next = 13;
            return _book["default"].findOne({
              $and: [{
                title: book.title
              }, {
                category: book.category
              }]
            });

          case 13:
            checkBook = _context9.sent;

            if (checkBook) {
              _context9.next = 25;
              break;
            }

            _context9.next = 17;
            return book.save();

          case 17:
            booksResult.push(book);
            _context9.next = 20;
            return _category["default"].findById(book.category);

          case 20:
            category = _context9.sent;

            if (!category) {
              _context9.next = 25;
              break;
            }

            category.books.push(book);
            _context9.next = 25;
            return category.save();

          case 25:
            i++;
            _context9.next = 6;
            break;

          case 28:
            return _context9.abrupt("return", booksResult);

          case 31:
            _context9.prev = 31;
            _context9.t0 = _context9["catch"](0);
            throw _context9.t0;

          case 34:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 31]]);
  }));
  return _crawlBooks.apply(this, arguments);
}

function getUrl(url) {
  return _axios["default"].get(url).then(function (res) {
    if (res.status === 200) {
      var html = res.data;

      var $ = _cheerio["default"].load(html);

      var listUrl = [];
      $('.ebook').each(function (i, e) {
        listUrl.push({
          url: $(e).find('a').attr('href')
        });
      });
      return listUrl;
    }
  })["catch"](function (err) {
    return console.log(err);
  });
}

function getBooksInfo(url) {
  return getUrl(url).then(function (res) {
    var list = [];
    res.forEach(function (value, index) {
      var result = _axios["default"].get(value.url).then(function (response) {
        if (response.status === 200) {
          var html = response.data;

          var $ = _cheerio["default"].load(html);

          var title = $('.thong_tin_ebook').find('.ebook_title').text().trim();
          var author = $('.thong_tin_ebook').find('h5').first().text().trim().split(': ').splice(1, 1).join("");
          var thumbnail = $('.thong_tin_ebook').find('.cover').find('img').attr('src');
          var download_epub = $('.thong_tin_ebook').find('.btn-primary').attr('href');
          var download_mobi = $('.thong_tin_ebook').find('.btn-success').attr('href');
          var download_pdf = $('.thong_tin_ebook').find('.btn-danger').attr('href');
          var book_url = convertBookUrl(title, author); // const category = categorId

          return {
            title: title,
            author: author,
            thumbnail: thumbnail,
            book_url: book_url,
            download_epub: download_epub,
            download_mobi: download_mobi,
            download_pdf: download_pdf
          };
        }
      })["catch"](function (error) {
        return console.log(error);
      });

      list.push(result);
    });
    return list;
  });
}