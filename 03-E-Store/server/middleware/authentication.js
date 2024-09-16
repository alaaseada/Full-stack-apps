const jwt = require('jsonwebtoken')
const { CustomError } = require('./errors')
const { StatusCodes } = require('http-status-codes')
require('dotenv').config()

const jwt_secret = process.env.JWT_SECRET_KEY

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers?.authorization || null
  if (authHeader && authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1]
    const { _id: userId } = jwt.verify(token, jwt_secret)
    if (userId === '66d98d76c10ab2529abcad78') {
      throw new CustomError(
        'Unauthorized to view this page',
        StatusCodes.FORBIDDEN
      )
    }
    req.userId = userId
    next()
  } else {
    throw new CustomError(
      'Unauthorized to view this page',
      StatusCodes.UNAUTHORIZED
    )
  }
}

module.exports = authenticateUser
