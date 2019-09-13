module.exports = department => {
  return function(req, res, next) {
    if (req.decodedJwt.roles && req.decodedJwt.roles.includes(department)) {
      next();
    } else {
      res.status(403).json({ you: 'you have no power here!' });
    }
  };
};