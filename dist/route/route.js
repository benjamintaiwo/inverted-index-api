'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _invertedIndex = require('../src/inverted-index');

var _invertedIndex2 = _interopRequireDefault(_invertedIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var upload = (0, _multer2.default)({ dest: 'fixtures/' }).single('content'); // specify the uploading directory
/*  eslint linebreak-style: ["error", "windows"]*/
/* eslint no-undef: "error"*/
var search = (0, _multer2.default)(); // This is used for search endpoint since no uploading is involved
var router = _express2.default.Router();
var newIndex = new _invertedIndex2.default();

/**
 * @return {Object} content of file in file
 * @param {String} fileName Name of file to be read
 */
function readFile(fileName) {
  var read = JSON.parse(_fs2.default.readFileSync(_path2.default.join('fixtures', fileName)));
  try {
    JSON.parse(_fs2.default.readFileSync(_path2.default.join('fixtures', fileName)));
  } catch (e) {
    return 'Invalid JSON file';
  }
  return read;
}

// create endpoint
router.post('/api/create', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.json({ error: 'Uploading unsuccessful!' });
    }
    if (req.file === undefined) {
      res.json({ error: 'Kindly upload a file' });
    } else {
      if (req.file.originalname.match('.json$') === null) {
        res.json({ error: 'Invalid file uploaded!' });
      } else {
        var filePath = req.file.filename.toString();
        newIndex.createIndex(req.file.originalname, readFile(filePath));
        res.json(newIndex.getIndex());
      }
      _fs2.default.unlinkSync(_path2.default.join('fixtures', req.file.filename));
      // delete the uploaded file once the index is created
    }
  });
});
// search endpoint
router.post('/api/search', search.single(), function (req, res) {
  res.json(newIndex.searchIndex(req.body.fileName, req.body.searchQuery));
});

exports.default = router;