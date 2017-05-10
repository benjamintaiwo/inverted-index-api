'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*  eslint linebreak-style: ["error", "windows"]*/
/* eslint no-undef: "error"*/

// import path from 'path';
// import fs from 'fs';
/**
 * Inverted index class
 */
var InvertedIndex = function () {
  /**
   * Inverted index constructor
   */
  function InvertedIndex() {
    _classCallCheck(this, InvertedIndex);

    // Object to hold the index
    this.index = {};
  }
  /*
   * method to convert words strings into an array
   * @param{String} words - String to tokenize
   * @return{Array} list of words without of special characters or symbols
   */


  _createClass(InvertedIndex, [{
    key: 'createIndex',


    /**
     * @description read the uploaded file
     * @param {string} fileName
     * @return {Object} content
     */
    /*readFile(fileName) {
      try {
        JSON.parse(fs.readFileSync(path.join('fixtures', fileName)));
      }
      catch (e) {
        return 'Invalid JSON file';
      }
      return JSON.parse(fs.readFileSync(path.join('fixtures', fileName)));
    } */

    /**
     * method that create index for the documents in the file
     * @param{String} fileName - The name of the file to be indexed
     * @param{Array} content - JSON Array of filecontent to be indexed
     * @return{Object} indexResult - That maps words to their document location indices
     */
    value: function createIndex(fileName, content) {
      var IndexResult = {};
      var toIndex = [];
      if (content.length === 0) {
        return 'JSON file is Empty';
      }
      content.forEach(function (document) {
        if (document.text) {
          toIndex.push(document.title.toLowerCase() + ' ' + document.text.toLowerCase());
        }
      });
      var newContent = InvertedIndex.uniqueWords(toIndex.join(' '));
      newContent.forEach(function (word) {
        IndexResult[word] = [];
        toIndex.forEach(function (document, indexPosition) {
          if (document.indexOf(word) > -1) {
            IndexResult[word].push(indexPosition);
          }
        });
      });
      this.index[fileName] = IndexResult;
    }

    /**
     * method to return index created
     * @param{String} fileName is required
     * @return{Object} index - The correct mapping of words to locations for specified file
     */

  }, {
    key: 'getIndex',
    value: function getIndex(fileName) {
      return this.index[fileName];
    }

    /**
     * method to search for words or sentence in the document
     * @param{String} searchQuery - Words to search for
     * @param{String} indexToSearch - Index to query
     * @return{Object} wordFound - Maps searched words to document locations
     */

  }, {
    key: 'searchIndex',
    value: function searchIndex(searchQuery, indexToSearch) {
      var _this = this;

      searchQuery = searchQuery.toLowerCase();
      var wordFound = {};
      var sentenceSearch = [];
      var searchTerms = InvertedIndex.uniqueWords(searchQuery);
      searchTerms.forEach(function (word) {
        var errorMessage = 'Not Found';
        if (indexToSearch) {
          // eslint-disable-next-line
          _this.index[indexToSearch][word] ? wordFound[word] = _this.index[indexToSearch][word] : wordFound[word] = errorMessage;
        } else {
          Object.keys(_this.index).forEach(function (key) {
            // eslint-disable-next-line
            _this.index[key][word] ? wordFound[word] = _this.index[key][word] : wordFound[word] = errorMessage;

            sentenceSearch.push(wordFound);
            wordFound = {};
          });
        }
      });
      return sentenceSearch.length === 0 ? wordFound : sentenceSearch;
    }
  }], [{
    key: 'tokenize',
    value: function tokenize(words) {
      return words.trim().replace(/-/g, ' ').replace(/[.,\/#!$%\^&@\*;:'{}=\_`~()]/g, '').toLowerCase().split(' ').sort();
    }
    /**
    * @param {any} content - file contents for searching.
    * @return {Boolean} - return true or false to validate JSON file
    */

  }, {
    key: 'isValidFile',
    value: function isValidFile(content) {
      var validate = true;
      if (content.length > 0 && content[0].title && content[0].text) {
        validate = true;
      } else {
        validate = false;
      }
      return validate;
    }

    /**
     * method to get the tokens of the content without duplicates
     * @param{String} words - The string to be filtered
     * @return{Array} tokens - words devoid of duplicates
     */

  }, {
    key: 'uniqueWords',
    value: function uniqueWords(words) {
      var tokens = InvertedIndex.tokenize(words);
      return tokens.filter(function (item, index) {
        return tokens.indexOf(item) === index;
      });
    }
  }]);

  return InvertedIndex;
}();

module.exports = InvertedIndex;