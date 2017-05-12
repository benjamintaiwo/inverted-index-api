/*  eslint linebreak-style: ["error", "windows"]*/
/* eslint no-undef: "error"*/
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import InvertedIndex from '../src/inverted-index';
// specify the uploading directory
const upload = multer({ dest: 'fixtures/' }).single('content');
const search = multer();
const router = express.Router();
const newIndex = new InvertedIndex();


/**
 * @return {Object} content of file in file
 * @param {String} fileName Name of file to be read
 */
function readFile(fileName) {
  const read = JSON.parse(fs.readFileSync(path.join('fixtures', fileName)));
  try {
    JSON.parse(fs.readFileSync(path.join('fixtures', fileName)));
  } catch (e) {
    return 'Invalid JSON file';
  }
  return read;
}

  // create endpoint
router.post('/api/create', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.json({ error: 'Uploading unsuccessful!' });
    }
    if (req.file === undefined) {
      res.json({ error: 'Kindly upload a file' });
    } else {
      if (req.file.originalname.match('.json$') === null) {
        res.json({ error: 'Invalid file uploaded!' });
      } else {
        const filePath = (req.file.filename).toString();
        newIndex.createIndex(req.file.originalname, readFile(filePath));
        res.json(newIndex.getIndex());
      }
      // uploaded file should be deleted the index is created
      fs.unlinkSync(path.join('fixtures', req.file.filename));
    }
  });
});
// search endpoint
router.post('/api/search', search.single(), (req, res) => {
  res.json(newIndex.searchIndex(req.body.fileName, req.body.searchQuery));
});



export default router;
