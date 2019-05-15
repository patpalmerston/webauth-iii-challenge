const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const db = require('../users/users-model');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);

  user.password = hash;

  db.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        
        res.status(200).json({ message: `welcome ${user.username}!, have a token..`, token,
       });
      } else {
        res.status(401).json({ message: 'Invalid Credentials log in' })
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

// router.get('./logout', (req, res) => {
//   if (req.session) {
//     req.session.destroy(err => {
//       if(err) {
//         res.send('was unable to log out')
//       } else {
//         res.send('bye, thanks')
//       }
//     })
//   } else {
//     res.end();
//   }
// })

//function to generate token
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department // not nullable?
    // this is where we hard coded data for the student role
    //example
    //roles: ['Student'],
  }

  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;