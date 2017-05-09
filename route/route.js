/*  eslint linebreak-style: ["error", "windows"]*/
/* eslint no-undef: "error"*/
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import InvertedIndex from '../src/inverted-index';

const upload = multer({ dest: 'fixtures/' }).single('fileContent'); // specify the uploading directory
const search = multer();       // This is used for search endpoint since no uploading is involved
const router = express.Router();
const newIndex = new InvertedIndex();
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
        res.json(newIndex.createIndex(req.body.fileName,
        newIndex.readFile(req.file.filename)));
      }
      fs.unlinkSync(path.join('fixtures', req.file.filename)); // delete the uploaded file once the index is created
    }
  });
});
// search endpoint
router.post('/api/search', search.single(), (req, res) => {
  if (req.body.fileName !== undefined) {
    if (req.body.searchTerms.length === 0) {
      res.json({ error: 'The searchTerms cannot be empty' });
    }
    res.json(newIndex.searchIndex(newIndex.index,
    req.body.fileName, req.body.searchTerms));
  } else {
    if (req.body.searchTerms.length === 0) {
      res.json({ error: 'The searchTerms cannot be empty' });
    }
    res.json(newIndex.searchIndex(newIndex.index, req.body.searchTerms));
  }
});
export default router;