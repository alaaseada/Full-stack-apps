const NotFound = (req, res, next) => {
  return res.status(404).json({ status: 404, msg: 'Invalid Route' })
}

module.exports = NotFound
