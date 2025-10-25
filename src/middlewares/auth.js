require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const AuthMiddleware = async (req, res, next) => {
  try {
    const { access_token } = req.cookies;
    const decodedInfo = await jwt.verify(access_token, process.env.JWT_SECRET);
    const user = await User.findById({ _id: decodedInfo._id });
    if (!user) {
      throw new Error('User Not Found');
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send('Error: ' + error.message);
  }
}

module.exports = AuthMiddleware;
