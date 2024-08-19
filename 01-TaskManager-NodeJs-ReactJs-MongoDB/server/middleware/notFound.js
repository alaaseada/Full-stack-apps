const notFound = (req, res, next) => {
  return res.status(404).json({ success: false, msg: 'Route is not found' })
}

module.exports = notFound
