const { CustomError } = require('../errors/customError')

const errorHandler = (err, req, res, next) => {
  console.log(err)
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      success: false,
      msg: `${err.message}`,
    })
  }
  return res.status(500).json({
    success: false,
    msg: `${err.message}`,
  })
}

module.exports = errorHandler
