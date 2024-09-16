const { StatusCodes } = require('http-status-codes')
const { CustomError } = require('../middleware/errors')
const User = require('../models/users')

const registerUser = async (req, res) => {
  const user = await User.create(req.body)
  return res.status(StatusCodes.CREATED).json({ user })
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    throw new CustomError(
      'Email and password are required',
      StatusCodes.BAD_REQUEST
    )
  const user = await User.findOne({ email })
  if (!user)
    throw new CustomError('User is not found', StatusCodes.UNAUTHORIZED)
  const passwordIsValid = await user.verifyPassword(password)
  if (!passwordIsValid)
    throw new CustomError('User is not found', StatusCodes.UNAUTHORIZED)
  const token = user.generateToken()
  return res
    .status(StatusCodes.OK)
    .json({ username: user.username, email: user.email, token })
}

const getUserById = async (req, res) => {
  const user = {}
  return res.status().json({ user })
}
module.exports = { loginUser, registerUser, getUserById }
