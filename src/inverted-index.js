/*  eslint linebreak-style: ["error", "windows"]*/
/* eslint no-undef: "error"*/

import path from 'path';
import fs from 'fs';
/**
 * Inverted index class
 */
class InvertedIndex {
  /**
   * Inverted index constructor
   */
  constructor() {
    // Object to hold the index
    this.index = {};
  }

  /**
 * @description read the uploaded file
 * @param {string} fileName
 * @return {Object} content
 */
  static readFile(fileName) {
    try {
      JSON.parse(fs.readFileSync(path.join('fixtures', fileName)));
    }
    catch (e) {
      return 'Invalid JSON file';
    }
    return JSON.parse(fs.readFileSync(path.join('fixtures', fileName)));
  }
  /*
   * method to convert words strings into an array
   * @param{String} words - String to tokenize
   * @return{Array} list of words without of special characters or symbols
   */
  static tokenize(words) {
    return words.trim().replace(/-/g, ' ')
      .replace(/[.,\/#!$%\^&@\*;:'{}=\_`~()]/g, '')
      .toLowerCase()
      .split(' ')
      .sort();
  }
   /**
   * @param {any} content - file contents for searching.
   * @return {Boolean} - return true or false to validate JSON file
   */
  static isValidFile(content) {
    let validate = true;
    if (content.length > 0 &&
      content[0].title && content[0].text) {
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
  static uniqueWords(words) {
    const tokens = InvertedIndex.tokenize(words);
    return tokens.filter((item, index) => tokens.indexOf(item) === index);
  }

  /**
   * method that create index for the documents in the file
   * @param{String} fileName - The name of the file to be indexed
   * @param{Array} content - JSON Array of filecontent to be indexed
   * @return{Object} indexResult - That maps words to their document location indices
   */
  createIndex(fileName, content) {
    const IndexResult = {};
    const toIndex = [];
    if (content.length === 0) {
      return 'JSON file is Empty';
    }
    content.forEach((document) => {
      if (document.text) {
        toIndex
          .push(`${document.title.toLowerCase()} ${document.text
            .toLowerCase()}`);
      }
    });
    const newContent = InvertedIndex.uniqueWords(toIndex.join(' '));
    newContent.forEach((word) => {
      IndexResult[word] = [];
      toIndex.forEach((document, indexPosition) => {
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
  getIndex(fileName) {
    return this.index[fileName];
  }

  /**
   * method to search for words or sentence in the document
   * @param{String} searchQuery - Words to search for
   * @param{String} indexToSearch - Index to query
   * @return{Object} wordFound - Maps searched words to document locations
   */
  searchIndex(searchQuery, indexToSearch) {
    searchQuery = searchQuery.toLowerCase();
    let wordFound = {};
    const sentenceSearch = [];
    const searchTerms = InvertedIndex.uniqueWords(searchQuery);
    searchTerms.forEach((word) => {
      const errorMessage = 'Not Found';
      if (indexToSearch) {
        // eslint-disable-next-line
        this.index[indexToSearch][word] ?
          (wordFound[word] = this.index[indexToSearch][word]) :
          (wordFound[word] = errorMessage);
      } else {
        Object.keys(this.index).forEach((key) => {
        // eslint-disable-next-line
          this.index[key][word] ?
            (wordFound[word] = this.index[key][word]) :
            (wordFound[word] = errorMessage);

          sentenceSearch.push(wordFound);
          wordFound = {};
        });
      }
    });
    return (sentenceSearch.length === 0 ?
      wordFound : sentenceSearch);
  }

}
module.exports = InvertedIndex;
