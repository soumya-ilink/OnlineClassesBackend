const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./app.config/config.json');
const authHandler = require('./endpoints/authentication/index');

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5200',
    optionSuccessStatus: 204,
  }),
);
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

app.use('/', authHandler);

app.listen(config.app.port, () => {
  // eslint-disable-next-line no-console
  console.log('port is ', 5000);
});
