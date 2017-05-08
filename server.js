import supertest from 'supertest';
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import InvertedIndex from '../src/inverted-index';

const newIndex = new InvertedIndex();
const app = express();
const appRouter = express.Router();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
const port = process.env.PORT || 3000;
const upload = multer({ dest: 'uploads/' });
app.use('/api', appRouter);

appRouter.route('/create')
  .post(upload.array('req.file'), (req, res) => {
   if (req.file === undefined) {
      res.json({ error: 'Upload a file' });
    }
   if (err) {
      res.json({ error: 'Upload Not Successful!' });
    } 
   else {
      if (req.file.originalname.match('.json$') === null) {
        res.json({ error: 'Invalid file uploaded!' });
      }
      else {
        res.status(200).json(newIndex.createIndex(req.body.fileName, newIndex.readFile(req.file.fileName)));
      }
      fs.unlinkSync(path.join('fixtures', req.file.fileName)); // delete the uploaded file once the index is created
    }
  });
});
appRouter.route('/search')
    .post((req, res) => {
      const searchTerm = req.body.searchTerms;
      const fileNames = req.body.fileName;
      if (fileNames === undefined) {
        newIndex.searchIndex(newIndex.searchQuery, searchTerm);
      } else {
        newIndex.searchIndex(newIndex.searchQuery, fileNames, searchTerm);
      }
      res.status(200).json(newIndex.wordFound);
    });
    





app.listen(port, () => {
  console.log('server now running at ' + port);
});