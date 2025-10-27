const express = require('express');
const bcrypt = require('bcrypt');
const authRouter = express.Router();
const User = require('../models/user');
const { validateUserData } = require('../utils/uservalidators');

authRouter.post("/signup", async (req, res) => {
  try {
    // Validate
    validateUserData(req)
    const { firstName, lastName, emailId, password, age, gender, skills } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      skills,
    })
    await user.save();
    res.status(201).send('User added successfully');
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error('Invalid Credentials');
    }

    const isCredentialsValid = await user.isCredentialsValid(password);

    if (isCredentialsValid) {
      const token = await user.getJWT();
      res
        .cookie('access_token', token, {
          expires: new Date(Date.now() + 24 * 3600000)
        })
        .send('Login Sucessfull!!!');
    } else {
      throw new Error('Invalid Credentials');
    }

  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
})

authRouter.post("/logout", async (req, res) => {
  res
    .cookie('access_token', null, {
      expires: new Date(Date.now())
    })
    .send('Logout successfully');
})

module.exports = authRouter;