const mongoose = require('mongoose')
const validators = require('validator')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 4,
      maxLength: 20,
    },
    lastName: { type: String },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validators.isEmail(value)) {
          throw new Error('Email is not valid')
        }
      },
    },
    password: {
      type: String,
      validate(value) {
        if (!validators.isStrongPassword(value)) {
          throw new Error('Password is not strong enough!')
        }
      },
    },
    age: { type: Number },
    gender: {
      type: String,
      lowercase: true,
      validate(value) {
        if (!['male', 'female', 'others'].includes(value)) {
          throw new Error('Gender is not valid!')
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
