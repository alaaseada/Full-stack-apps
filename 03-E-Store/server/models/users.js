const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { promisify } = require('util')
const scryptPromisified = promisify(require('crypto').scrypt)
const { randomBytes } = require('crypto')

const jwt_secret = process.env.JWT_SECRET_KEY

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      maxLength: [50, 'Username cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      maxLength: [50, 'Email cannot exceed 50 characters'],
      match: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
      unique: [true, 'This email is already registered'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minLength: [8, 'Password must be between 8-16 characters'],
    },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  const crypto_salt = randomBytes(16).toString('hex')
  const hashedPassword = await scryptPromisified(this.password, crypto_salt, 16)
  this.password = hashedPassword.toString('hex')
  next()
})

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, jwt_secret)
  return token
}

userSchema.methods.verifyPassword = async function (password) {
  const crypto_salt = randomBytes(16).toString('hex')
  const hashedPassword = await scryptPromisified(
    password,
    crypto_salt,
    16
  ).toString('hex')
  return (this.password = hashedPassword)
}

const User = model('User', userSchema)
module.exports = User
