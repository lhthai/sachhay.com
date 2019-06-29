"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _default = (0, _graphql.buildSchema)("     \n    type Category {\n        id: ID!\n        name: String!\n        description: String!\n        category_url: String!\n        count: Int!\n        books: [Book!]\n    }\n\n    type Book {\n        id: ID!\n        title: String!\n        author: String!\n        thumbnail: String!\n        views: Int\n        category: Category!\n        book_url: String!\n        download_epub: String\n        download_mobi: String\n        download_pdf: String\n    }  \n\n    input CategoryInput {\n        name: String!\n        description: String!        \n    }\n\n    input BookInput {\n        title: String!\n        author: String!\n        thumbnail: String!\n        category: ID!\n    }\n\n    type RootQuery {\n        categories: [Category]\n        categoryByCategoryUrl(category_url: String!, page: Int!): Category\n        books: [Book]\n        bookByBookUrl(book_url: String!): Book\n        searchBooks(query: String!, page: Int!): [Book]\n    }\n\n    type RootMutation {\n        addCategory (categoryInput: CategoryInput): Category\n        updateCategory (id: ID!, name: String, description: String): Category\n        removeCategory (id: ID!): Category\n        addBook(bookInput: BookInput): Book\n        updateBook (id: ID!, title: String, author: String, thumbnail: String, category: ID): Book\n        removeBook (id: ID!): Book\n        crawlBooks(url: String!, category: ID!): [Book]\n    }\n\n    schema {\n        query: RootQuery\n        mutation: RootMutation\n    }\n");

exports["default"] = _default;