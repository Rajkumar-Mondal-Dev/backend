const express = require('express');
const AuthMiddleware = require('../middlewares/auth');
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", AuthMiddleware, async (req, res) => {
  const user = req.user;

  console.log("Sending a connection request");
  res.send(user.firstName + " sent a connection request!");
});
module.exports = requestRouter;