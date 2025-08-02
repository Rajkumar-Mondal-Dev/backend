const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');

const app = express();
app.use(express.json());

// SignUp
app.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send('User added successfully');
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).send('Email already exists');
    }
    res.status(500).send('Something went wrong!');
  }
});

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
    res.status(500).send('Something went wrong');
  }
});

// Delete User by ID
app.delete('/user', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.userId);
    res.send('User deleted successfully');
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});

// Update User by ID
app.patch('/user', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, req.body);
    res.send('User info updated successfully');
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});

// Connect DB and Start Server
(async () => {
  try {
    await connectDB();
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  } catch (err) {
    console.error('Failed to start server due to DB connection error');
  }
})();
