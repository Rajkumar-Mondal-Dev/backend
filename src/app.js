const express = require('express')
const app = express()

const { AdminMiddleware } = require('./middlewares/auth');

app.use('/admin',AdminMiddleware,(req, res)=>{
  res.status(200).send('Auth checked')
})

app.listen(5000, () => {
  console.log('Server is listening on 5000 port!')
})
