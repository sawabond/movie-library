const jwt = require('jsonwebtoken');

exports.cookieJwtAuth = (req, res, next) => {
  const token = req.get('Authorization');
  try {
    const user = jwt.verify(token, 'secret_key');
    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};
