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
