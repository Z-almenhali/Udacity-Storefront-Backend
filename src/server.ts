import express from 'express';
import router from './handlers/routes';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use('/', router);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default {
  app
};
