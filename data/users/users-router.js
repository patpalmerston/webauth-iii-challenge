const router = require('express').Router();
const db = require('./users-model');

const restricted = require('../auth/restricted-middleware');
// const checkDepartment = require('../auth/check-department-middleware');

router.get('/', restricted, (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err))
});

router.get('/:id', restricted, (req, res) => {
  db.findById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err))
})

module.exports = router;
// restricted,
// checkDepartment('department'), 