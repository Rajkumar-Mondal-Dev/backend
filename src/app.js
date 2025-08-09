const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const ValidateUserData = require('./utils/uservalidators');
const bcrypt = require('bcrypt');
const validators = require('validator');

const app = express();
app.use(express.json());

// SignUp
app.post('/signup', async (req, res) => {
  try {
    // Validate
    ValidateUserData(req)
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

app.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (user) {
      throw new Error('Invalid Credentials');
    }
    const isCredentialsValid = await bcrypt.compare(password, user.password);

    if (isCredentialsValid) {
      res.send('Login Sucessfull!!!');
    } else {
      throw new Error('Invalid Credentials');
    }

  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
})

// Get User by Email
app.get('/user', async (req, res) => {
  try {
    const { emailId } = req.query;
    const users = await User.find({ emailId });
    if (users.length) {
      res.send(users);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
});

// Delete User by ID
app.delete('/user', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.userId);
    res.send('User deleted successfully');
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
});

// Update User by ID
app.patch('/user', async (req, res) => {
  try {
    const ALLOWED_UPDATE_FIELDS = [
      'userId',
      'firstName',
      'lastName',
      'age',
      'skills',
    ];
    const data = req.body;
    const isUpdateAllowed = Object.keys(data).every((val) =>
      ALLOWED_UPDATE_FIELDS.includes(val)
    );
    if (!isUpdateAllowed) {
      throw new Error('Update not allowed');
    }
    if (data?.skills.length > 10) {
      throw new Error('Maximum 10 skills are allowed');
    }
    const user = await User.findByIdAndUpdate(req.body.userId, data, {
      returnDocument: 'after',
      runValidators: true,
    });
    res.send(user);
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
});

// Connect DB and Start Server
(async () => {
  try {
    await connectDB();
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    })
  } catch (err) {
    console.error('Failed to start server due to DB connection error');
  }
})()
