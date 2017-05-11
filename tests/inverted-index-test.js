/*  eslint linebreak-style: ["error", "windows"]*/
/* eslint no-undef: "error"*/
import InvertedIndex from '../src/inverted-index';
import books from '../fixtures/books.json';
import invalidJson from '../fixtures/invalidJson.json';
import emptyBook from '../fixtures/emptyBook.json';
// A test suite to read book data
describe('Inverted Index Suite', () => {
  //  Create an instance of the Index class
  /* beforeEach(() => {
    this.InvertedIndex = new InvertedIndex();
    this.index = this.invertedIndex.createIndex('books', books);
  });*/

  const newIndex = new InvertedIndex();
  const demoWords = 'inquiry #into the %wealth';
  newIndex.createIndex('books', books);
  describe('Class Inverted Index', () => {
    it('should be a class', () => {
      expect(newIndex instanceof InvertedIndex).toBe(true);
      expect(newIndex instanceof Object).toBe(true);
      expect(typeof (newIndex)).toBe('object');
    });
    it('Ensures a valid JSON array', () => {
      const isValid = InvertedIndex.isValidFile(books);
      expect(isValid).toBe(true);
    });

    it('Ensure proper error response when file is invalid or empty', () => {
      const isValid = InvertedIndex.isValidFile(invalidJson);
      expect(isValid).toBe(false);
    });
  });

  describe('Tokenize String', () => {
    it('Ensures it is available in class InvertedIndex', () => {
      expect(InvertedIndex.tokenize).toBeDefined();
    });
    it('Ensures it returns an array containing alphabets only', () => {
      expect(InvertedIndex.tokenize(demoWords)).not.toContain('%');
    });

    it('Ensures it returns an array containing alphabets only', () => {
      expect(InvertedIndex.tokenize(demoWords)).not.toContain('#');
    });

    it('Ensures it returns an array containing the correct number of words', () => {
      expect(InvertedIndex.tokenize(demoWords).length).toBe(4);
    });
  });

  describe('Unique Words', () => {
    it('Ensures It is available in class InvertedIndex', () => {
      expect(InvertedIndex.uniqueWords).toBeDefined();
    });
    it('Ensures it returns an array of words without duplicates', () => {
      expect(InvertedIndex.uniqueWords(demoWords).length).toBe(4);
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

  describe('Populate Index', () => {
    it('Ensures Index is created Once JSON is read', () => {
      expect(newIndex.index.books).toBeDefined();
    });
    it('Ensures words are mapped to their document location', () => {
      expect(Object.keys(newIndex.index).length).toBe(1);
      expect(Object.keys(newIndex.index.books).length).toBe(22);
      expect(newIndex.index.books.inquiry).toEqual([0]);
      expect(newIndex.index.books.this).toEqual([0, 1]);
    });
  });

  describe('Get Index', () => {
    it('Ensures index is correct', () => {
      expect(newIndex.getIndex()).toBeDefined();
      expect(Object.keys(newIndex.getIndex()).length).toBe(1);
    });
  });

  describe('Search Index', () => {
    it('Ensures passed in index is in the valid format', () => {
      expect(newIndex.searchIndex).toBeDefined();
    });
    it('Ensures index returns the correct results when searched',
      () => {
        expect(newIndex.searchIndex('books', 'inquiry')).toEqual({
          'inquiry': [0]
        });
        expect(newIndex.searchIndex('books', 'this')).toEqual({
          'this': [0, 1]
        });
        expect(newIndex.searchIndex('books', 'inertial')).toEqual({
          'inertial': 'Not Found'
        });
        expect(newIndex.searchIndex('books', 'third first nations')).toEqual({
          'third': [1],
          'first': [1],
          'nations': [0]
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
