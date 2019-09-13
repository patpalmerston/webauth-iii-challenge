const jwt = require('jsonwebtoken'); // installed this library

const secrets = require('../config/secrets');

module.exports = {
  generateToken,
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: user.department,
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}
