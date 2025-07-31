const express = require('express')
const connectDB = require('./config/database')
const User = require('./models/user')
const app = express()

// middleware
app.use(express.json())

// SignUp
app.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.status(200).send('User added succesfully')
  } catch (error) {
    res.status(400).send('User failed to signup')
  }
})

// getUser
app.get('/user', async (req, res) => {
  try {
    const users = await User.find({ emailId: req.body.emailId })
    if (users.length) {
      res.send('User Found')
    } else {
      res.status(404).send('Not found')
    }
  } catch (error) {
    res.status(400).send('Something went wrong')
  }
})

// DB Connection
connectDB()
  .then((response) => {
    console.log('DataBase Connection Established')
    app.listen(5000, () => {
      console.log('Server is listening on 5000 port!')
    })
  })
  .catch((error) => {
    console.log('DataBase Connection is Failsed', error)
  })
