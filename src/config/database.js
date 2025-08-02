const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'devTinder',
    })

    console.log('Database connected...')
  } catch (error) {
    console.error('Database connection failed:', error)
    throw error
  }
}

module.exports = connectDB
