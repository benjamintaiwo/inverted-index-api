const books = require('fixture/books');

// A test suite to read book data
describe('Inverted Index Suite', () => {
  //Create an instance of the Index class
  const newIndex = new InvertedIndex();
  const emptyBook = [];
  const sampleSentence = 'Tenses are %correct but define each #well';
  const multipleSearch = 'Let fear and doubt dissolve quickly';
  newIndex.createIndex('books', books);

  describe('Class Inverted Index', () => {
    it('should be a class', () => {
      expect(newIndex instanceof InvertedIndex).toBe(true);
      expect(newIndex instanceof Object).toBe(true);
      expect(typeof (newIndex)).toBe('object');
    });
  });

  describe('Tokenize String', () => {
    it('Ensures it is available in class InvertedIndex', () => {
      expect(InvertedIndex.tokenize).toBeDefined();
    });
    it('Ensures it returns an array containing alphabets only', () => {
      expect(InvertedIndex.tokenize(sampleSentence)).not.toContain('&');
    });
    it('Ensures it returns an array containing the correct number of words', () => {
      expect(InvertedIndex.tokenize(sampleSentence).length).toBe(10);
    });
  });

  describe('Unique Words', () => {
    it('Ensures It is available in class InvertedIndex', () => {
      expect(InvertedIndex.uniqueWords).toBeDefined();
    });
    it('Ensures it returns an array of words without duplicates', () => {
      expect(InvertedIndex.uniqueWords(sampleSentence).length).toBe(9);
    });
  });

  describe('Read Book Data', () => {
    it('Ensure createIndex is available in class InvertedIndex', () => {
      expect(newIndex.createIndex).toBeDefined();
    });
    it('Ensures the JSON file is not empty', () => {
      expect(newIndex.createIndex('emptyBook', emptyBook))
        .toBe('JSON file is Empty');
      expect(newIndex.createIndex('books', books))
        .not.toBe('JSON file is Empty');
    });
  });
