"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _schema = _interopRequireDefault(require("./graphql/schema"));

var _resolvers = _interopRequireDefault(require("./graphql/resolvers"));

var _path = _interopRequireDefault(require("path"));

_dotenv["default"].config();

var app = (0, _express["default"])(); // Config middlewares

app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use("/graphql", (0, _expressGraphql["default"])({
  schema: _schema["default"],
  rootValue: _resolvers["default"],
  graphiql: true
}));
app.use(_express["default"]["static"](_path["default"].join(__dirname, "../client/build")));
app.get("*", function (req, res) {
  res.sendFile(_path["default"].join(__dirname, "../client/build/index.html"));
});

function main() {
  _mongoose["default"].connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(function () {
    app.listen(process.env.PORT, function () {
      return console.log("App running on port ".concat(process.env.PORT));
    });
  })["catch"](function (err) {
    console.log(err);
  });
}

main();