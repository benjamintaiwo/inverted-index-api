<<<<<<< HEAD

=======
/*  eslint linebreak-style: ["error", "windows"]*/
>>>>>>> develop
/* eslint no-undef: "error"*/

import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import router from './route/route';

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
<<<<<<< HEAD
app.listen(process.env.PORT_TEST, () => {
    console.log('server now running at ' + process.env.PORT_TEST);
});
// load the routes
app.use('/', router);
=======
app.use('/', router);

app.listen(process.env.PORT_TEST, () => {
    console.log('server now running at ' + process.env.PORT_TEST);
});

// load the routes
>>>>>>> develop
export default app;
