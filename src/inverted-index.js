/*  eslint linebreak-style: ["error", "windows"]*/
/* eslint no-undef: "error"*/

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
   * @param{String} words - String to tokenize
   * @return{Array} list of words devoid of special characters or symbols
   */
  static tokenize(words) {
    return words.trim().replace(/-/g, ' ')
      .replace(/[.,\/#!$%\^&@\*;:'{}=\_`~()]/g, '')
      .toLowerCase()
      .split(' ')
      .sort();
  }
   /**
   * @param {any} fileToIndex - content of file to search.
   * @return {Boolean} - return true or false
   * @memberOf InvertedIndex
   */
  static isValidFile(fileToIndex) {
    let check = true;
    if (fileToIndex.length > 0 &&
      fileToIndex[0].title && fileToIndex[0].text) {
      check = true;
    } else {
      check = false;
    }
    return check;
  }

  /**
   * @param{String} words - The string to be filtered
   * @return{Array} tokens - Without duplicated words
   */
  static uniqueWords(words) {
    const tokens = InvertedIndex.tokenize(words);
    return tokens.filter((item, index) => tokens.indexOf(item) === index);
  }

  /**
   * @param{String} fileName - The name of the file to be indexed
   * @param{Array} fileToIndex - Array of contents of the JSON file to index
   * @return{Object} index - That maps words to locations(documents)
   */
  createIndex(fileName, fileToIndex) {
    const wordsToIndex = [];
    const fileIndex = {};
    const fileLength = fileToIndex.length;
    if (fileLength === 0) {
      return 'JSON file is Empty';
    }
    fileToIndex.forEach((document) => {
      if (document.text) {
        wordsToIndex
          .push(`${document.title.toLowerCase()} ${document.text
            .toLowerCase()}`);
      }
    });
    const uniqueContent = InvertedIndex.uniqueWords(wordsToIndex.join(' '));
    uniqueContent.forEach((word) => {
      fileIndex[word] = [];
      wordsToIndex.forEach((document, indexPosition) => {
        if (document.indexOf(word) > -1) {
          fileIndex[word].push(indexPosition);
        }
      });
    });
    this.index[fileName] = fileIndex;
  }

  /**
   * @param{String} fileName - The name of the file whose index is required
   * @return{Object} index - The correct mapping of words to locations for specified file
   */
  getIndex(fileName) {
    return this.index[fileName];
  }

  /**
   * @param{String} searchQuery - Words to search for
   * @param{String} indexToSearch - Index to query
   * @return{Object} searchResults - Maps searched words to document locations
   */
  searchIndex(searchQuery, indexToSearch) {
    searchQuery = searchQuery.toLowerCase();
    const multipleFileResults = [];
    let singleSearchResult = {};
    const searchTerms = InvertedIndex.uniqueWords(searchQuery);
    searchTerms.forEach((word) => {
      const errorMessage = 'Not Found';
      if (indexToSearch) {
        // eslint-disable-next-line
        this.index[indexToSearch][word] ?
          (singleSearchResult[word] = this.index[indexToSearch][word]) :
          (singleSearchResult[word] = errorMessage);
      } else {
        Object.keys(this.index).forEach((key) => {
        // eslint-disable-next-line
          this.index[key][word] ?
            (singleSearchResult[word] = this.index[key][word]) :
            (singleSearchResult[word] = errorMessage);

          multipleFileResults.push(singleSearchResult);
          singleSearchResult = {};
        });
      }
    });
    return (multipleFileResults.length === 0 ?
      singleSearchResult : multipleFileResults);
  }

}
module.exports = InvertedIndex;
