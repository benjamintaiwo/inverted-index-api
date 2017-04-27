const index = new index(readData); 
describe('Read book data', () => {
  it('Ensures first that file is a valid JSON file', () => {
    expect(readData.isValidJson(JSON.stringify(file1))).toBe(true);
    expect(readData.isValidJson(file1)).toBe('Invalid Json file');
    });

    it('Ensures the file content is actually a valid JSON Array', () => {
      index.uploadedFiles['file1.json'] = file1;
      expect(readData.checkJson('file1.json', index.uploadedFiles)).toBe(true);
    });

    it('Ensures JSON array is not empty', () => {
      index.uploadedFiles['file1.json'] = file1;
      index.uploadedFiles['file2.json'] = file2;
      expect(readData.checkJson('file1.json', index.uploadedFiles)).toBe(true);
      expect(readData.checkJson('file2.json', index.uploadedFiles)).toBe(false);
    });

    describe('Get Index', () => {
    index.uploadedFiles['file1.json'] = file1;
    index.createIndex('file1.json');
    index.getIndex('file1.json');

    it('Ensures ​getIndex​ method takes a string argument that specifies the location of the JSON data.', () => {
      expect(index.getIndex('file1.json')).toEqual(jasmine.any(Object));
    });
  });

  describe('Populate Index', () => {
    index.uploadedFiles['file1.json'] = file1;
    const creator = index.createIndex('file1.json');
    const indexed = index.getIndex('file1.json');

    it('Ensures that the index is created once the JSON file has been read', () => {
      expect(indexed['file1.json'].an).toEqual([0]);
      expect(indexed['file1.json'].a).toEqual([0, 1]);
    });

    it('Ensures that the index returned is an object', () => {
      expect(creator).toBe(true);
      expect(typeof indexed).toBe('object');
    });

    it('Ensures index is not overwritten by a new JSON file', () => {
      expect(Object.keys(index.indexMap)).toEqual(['file1.json', 'file2.json']);
    });
  });