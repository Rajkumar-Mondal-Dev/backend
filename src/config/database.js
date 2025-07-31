const mongoose = require('mongoose')

const connectDB = async () => {
  mongoose.connect(
    'mongodb+srv://raj:Rajk2001%40@rajkumar-mondal-cluster.ewp9x7h.mongodb.net/devTinder'
  )
}

module.exports = connectDB;
