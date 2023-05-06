const jwt = require('jsonwebtoken');
const User = require('./Entities/User');

const getUser = async (username) => {
  let user = await User.findOne({
    where: {
      username: username,
    },
  }).catch((err) => console.warn(err));

  return user?.dataValues;
};

module.exports = async (req, res) => {
  const { username, password } = req.body;

  const user = await getUser(username);

  if (!user || user.password !== password) {
    return res.status(403).json({
      error: 'Invalid password',
    });
  }

  const token = jwt.sign(user, 'secret_key', { expiresIn: '1h' });

  return res.json({ token: token });
};
