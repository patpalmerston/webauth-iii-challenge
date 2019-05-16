const router = require('express').Router();
const bcrypt = require('bcryptjs');

const tokenService = require('./token-service');

const db = require('../users/users-model');

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  db.add(user)
    .then(saved => {
      const token = tokenService.generateToken(saved);
      res.status(201).json({message: `Welcome ${saved.username}!`, token});
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


router.post('/login', (req, res) => {
  let { username, password } = req.body;

  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.generateToken(user);
        
        res.status(200).json({ 
          message: `welcome ${user.username}!, have a token..`, 
          token,
          department: token.department,
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


module.exports = router;