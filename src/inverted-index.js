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


  static tokenize(words) {
    return words.trim().replace(/-/g, ' ')
      .replace(/[.,\/#!$%\^&@\*;:'{}=\_`~()]/g, '')
      .toLowerCase()
      .split(' ')
      .sort();
  }

  /**
   * @param{String} words - The string to be filtered
   * @return{Array} tokens - Without duplicated words
   */
  static uniqueWords(words) {
    const tokens = InvertedIndex.tokenize(words);
    return tokens.filter((item, index) => tokens.indexOf(item) === index);
  }


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

  
  getIndex(fileName) {
    return this.index[fileName];
  }