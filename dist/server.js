'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _route = require('./route/route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*  eslint linebreak-style: ["error", "windows"]*/
/* eslint no-undef: "error"*/

_dotenv2.default.config();
var app = (0, _express2.default)();
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use('/', _route2.default);

app.listen(process.env.PORT_TEST, function () {
    console.log('server now running at ' + process.env.PORT_TEST);
});

// load the routes
exports.default = app;