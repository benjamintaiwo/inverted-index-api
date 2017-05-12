'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*  eslint linebreak-style: ["error", "windows"]*/
/* eslint no-undef: "error"*/


var _invertedIndex = require('../src/inverted-index');

var _invertedIndex2 = _interopRequireDefault(_invertedIndex);

var _books = require('../fixtures/books.json');

var _books2 = _interopRequireDefault(_books);

var _invalidJson = require('../fixtures/invalidJson.json');

var _invalidJson2 = _interopRequireDefault(_invalidJson);

var _emptyBook = require('../fixtures/emptyBook.json');

var _emptyBook2 = _interopRequireDefault(_emptyBook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A test suite to read book data
describe('Inverted Index Suite', function () {
  //  Create an instance of the Index class
  /* beforeEach(() => {
    this.InvertedIndex = new InvertedIndex();
    this.index = this.invertedIndex.createIndex('books', books);
  });*/

  var newIndex = new _invertedIndex2.default();
  var demoWords = 'inquiry #into the %wealth';
  newIndex.createIndex('books', _books2.default);
  describe('Class Inverted Index', function () {
    it('should be a class', function () {
      expect(newIndex instanceof _invertedIndex2.default).toBe(true);
      expect(newIndex instanceof Object).toBe(true);
      expect(typeof newIndex === 'undefined' ? 'undefined' : _typeof(newIndex)).toBe('object');
    });
    it('Ensures a valid JSON array', function () {
      var isValid = _invertedIndex2.default.isValidFile(_books2.default);
      expect(isValid).toBe(true);
    });

    it('Ensure proper error response when file is invalid or empty', function () {
      var isValid = _invertedIndex2.default.isValidFile(_invalidJson2.default);
      expect(isValid).toBe(false);
    });
  });

  describe('Tokenize String', function () {
    it('Ensures it is available in class InvertedIndex', function () {
      expect(_invertedIndex2.default.tokenize).toBeDefined();
    });
    it('Ensures it returns an array containing alphabets only', function () {
      expect(_invertedIndex2.default.tokenize(demoWords)).not.toContain('%');
    });

    it('Ensures it returns an array containing alphabets only', function () {
      expect(_invertedIndex2.default.tokenize(demoWords)).not.toContain('#');
    });

    it('Ensures it returns an array containing the correct number of words', function () {
      expect(_invertedIndex2.default.tokenize(demoWords).length).toBe(4);
    });
  });

  describe('Unique Words', function () {
    it('Ensures It is available in class InvertedIndex', function () {
      expect(_invertedIndex2.default.uniqueWords).toBeDefined();
    });
    it('Ensures it returns an array of words without duplicates', function () {
      expect(_invertedIndex2.default.uniqueWords(demoWords).length).toBe(4);
    });
  });

  describe('Read Book Data', function () {
    it('Ensure createIndex is available in class InvertedIndex', function () {
      expect(newIndex.createIndex).toBeDefined();
    });
    it('Ensures the JSON file is not empty', function () {
      expect(newIndex.createIndex('emptyBook', _emptyBook2.default)).toBe('JSON file is Empty');
      expect(newIndex.createIndex('books', _books2.default)).not.toBe('JSON file is Empty');
    });
  });

  describe('Populate Index', function () {
    it('Ensures Index is created Once JSON is read', function () {
      expect(newIndex.index.books).toBeDefined();
    });
    it('Ensures words are mapped to their document location', function () {
      expect(Object.keys(newIndex.index).length).toBe(1);
      expect(Object.keys(newIndex.index.books).length).toBe(22);
      expect(newIndex.index.books.inquiry).toEqual([0]);
      expect(newIndex.index.books.this).toEqual([0, 1]);
    });
  });

  describe('Get Index', function () {
    it('Ensures index is correct', function () {
      expect(newIndex.getIndex()).toBeDefined();
      expect(Object.keys(newIndex.getIndex()).length).toBe(1);
    });
  });

  describe('Search Index', function () {
    it('Ensures passed in index is in the valid format', function () {
      expect(newIndex.searchIndex).toBeDefined();
    });
    it('Ensures index returns the correct results when searched', function () {
      expect(newIndex.searchIndex('books', 'inquiry')).toEqual({
        inquiry: [0]
      });
      expect(newIndex.searchIndex('books', 'this')).toEqual({
        this: [0, 1]
      });
      expect(newIndex.searchIndex('books', 'inertial')).toEqual({
        inertial: 'Not Found'
      });
      expect(newIndex.searchIndex('books', 'third first nations')).toEqual({
        third: [1],
        first: [1],
        nations: [0]
      });
    });
    /* it('Ensures it searches all indexed files if a filename/key is not passed', () => {
      expect(newIndex.searchIndex('inquiry')).toEqual([{ inquiry: [0] }]);
      expect(newIndex.searchIndex('this')).toEqual([{
        this: [0, 1]
      }]);
      expect(newIndex.searchIndex('inertia')).toEqual([{
        inertia: 'Not Found'
      }]);
    });*/
  });
});