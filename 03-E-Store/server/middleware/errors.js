const { EmailJSResponseStatus } = require('@emailjs/nodejs')
const { StatusCodes } = require('http-status-codes')

class CustomError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

const errorHandler = (error, req, res, next) => {
  const customError = {
    status: error.status ?? StatusCodes.INTERNAL_SERVER_ERROR,
    message: '',
  }
  if (error.name === 'ValidationError') {
    Object.keys(error.errors).forEach((field) => {
      customError.message += `${field} is invalid `
    })
    customError.status = StatusCodes.BAD_REQUEST
  }
  if (error.name === 'MongoServerError') {
    if (error.code === 11000) {
      customError.message = `${Object.keys(error.errorResponse.keyValue).join(
        ','
      )} already exists`
    }
  }
  if (error instanceof EmailJSResponseStatus) {
    customError.message = error.text
    customError.status = error.status
  }
  if (error.name === 'CastError') {
    customError.status = StatusCodes.BAD_REQUEST
    customError.message = `Invalid ${error.path}`
  }
  console.log(customError.message)
  return res
    .status(customError.status)
    .json({ msg: customError.message || error.message }) //
}

module.exports = { CustomError, errorHandler }
