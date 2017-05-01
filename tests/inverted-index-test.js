const books = require('fixture/books');

// A test suite to read book data
describe('Inverted Index Suite', () => {
  //Create an instance of the Index class
  const newIndex = new InvertedIndex();
  const emptyBook = [];
  const demoWords = 'Tenses are %correct but define each #well';
  const sentenceSearch = 'It seeks mighty string also';
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
      expect(InvertedIndex.tokenize(demoWords)).not.toContain('%');
    });
    it('Ensures it returns an array containing the correct number of words', () => {
      expect(InvertedIndex.tokenize(demoWords).length).toBe(10);
    });
  });

  describe('Unique Words', () => {
    it('Ensures It is available in class InvertedIndex', () => {
      expect(InvertedIndex.uniqueWords).toBeDefined();
    });
    it('Ensures it returns an array of words without duplicates', () => {
      expect(InvertedIndex.uniqueWords(demoWords).length).toBe(9);
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
      expect(Object.keys(newIndex.index.books).length).toBe(25);
      expect(newIndex.index.books.An).toEqual([0]);
      expect(newIndex.index.books.the).toEqual([0, 1]);
    });
  });

  describe('Get Index', () => {
    it('Ensures index is correct', () => {
      expect(newIndex.getIndex('books')).toBeDefined();
      expect(Object.keys(newIndex.getIndex('books')).length).toBe(25);
    });
  });

  describe('Search Index', () => {
    it('Ensures passed in index is in the valid format', () => {
      expect(newIndex.searchIndex).toBeDefined();
    });
    it('Ensures index returns the correct results when searched',
      () => {
        expect(newIndex.searchIndex('An', 'books')).toEqual({
          'An': [0]
        });
        expect(newIndex.searchIndex('the', 'books')).toEqual({
          'the': [0, 1]
        });
        expect(newIndex.searchIndex('inertia', 'books')).toEqual({
          'inertia': 'Not Found'
        });
        expect(newIndex.searchIndex(sentenceSearch, 'books')).toEqual({
          'It': 'Not Found',
          'seeks': [0],
          'mighty': 'Not Found',
          'string': [0, 1],
          'also' : [1]
        });
    });
    it('Ensures it searches all indexed files if a filename/key is not passed',
      () => {
        expect(newIndex.searchIndex('An')).toEqual([ { 'An': [0] } ]);
        expect(newIndex.searchIndex('the')).toEqual([ {
          'the': [0, 1]
        } ]);
        expect(newIndex.searchIndex('inertia')).toEqual([ {
          'inertia': 'Not Found'
        } ]);
        expect(newIndex.searchIndex(sentenceSearch)).toEqual([
          {'It': 'Not Found' },
          {  'seeks': [0]},
          { 'mighty': 'Not Found' },
          { 'string': [0, 1] },
          { 'also' : [1] }
        ]);
      });
  });
});

