const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const AuthMiddleware = require('../middlewares/auth');
const { validateUserProfileEditData } = require('../utils/uservalidators');
const profileRouter = express.Router();

profileRouter.get("/profile/view", AuthMiddleware, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
})

profileRouter.patch("/profile/edit", AuthMiddleware, async (req, res) => {
  try {
    const loggedInUser = req.user;
    if (validateUserProfileEditData(req)) {
      Object.keys(req.body).forEach(field => loggedInUser[field] = req.body[field]);
      await loggedInUser.save();
      res.json({
        message: `${loggedInUser.firstName} your profile updated successfully`,
        data: loggedInUser
      });
    } else {
      throw new Error("Invalid edit request");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
})

profileRouter.patch("/profile/password", AuthMiddleware, async (req, res) => {
  try {
    const { emailId, currentPassword, newPassword } = req.body;
    let user = await User.findOne({ emailId });

    if (!user) {
      throw new Error('Invalid Credentials');
    }

    const isCredentialsValid = await user.isCredentialsValid(currentPassword);

    if (isCredentialsValid) {
      user.password = bcrypt.hashSync(newPassword, 10);
      user.save();
      res.json({
        message: "Password updated successfully",
        data: user
      })
    } else {
      throw new Error('Invalid Credentials');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
})

module.exports = profileRouter;