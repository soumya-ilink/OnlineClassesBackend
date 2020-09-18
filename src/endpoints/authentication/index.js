const express = require('express');
const query = require('../../queries/authentication/index');
const logger = require('../../utils/logger');

const router = express.Router();

router.post('/register', (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req);
  query.registerUser(req.body).then(() => {
    res.json('user registered sucessfully');
  }, (err) => {
    logger.error(err);
    res.json('something went wrong');
  });
});

module.exports = router;
