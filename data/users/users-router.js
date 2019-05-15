const router = require('express').Router();
const db = require('./users-model');
// const restricted = require('../auth/restricted-middleware');

router.get('/', (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err))
});

module.exports = router;