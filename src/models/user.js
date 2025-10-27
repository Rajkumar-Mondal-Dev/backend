const mongoose = require('mongoose')
const validators = require('validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not invalid gender type`,
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

userSchema.methods.getJWT = async function () {
  return await jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

userSchema.methods.isCredentialsValid = async function (passwordInputByUser) {
  return await bcrypt.compare(passwordInputByUser, this.password);
}

const User = mongoose.model("User", userSchema);
module.exports = User;
