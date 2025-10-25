const express = require('express');
const profileRouter = express.Router();
const AuthMiddleware = require('../middlewares/auth');

// Profile
profileRouter.get('/profile', AuthMiddleware, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
})

module.exports = profileRouter;