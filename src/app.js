require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
