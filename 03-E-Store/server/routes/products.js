const express = require('express')
const Router = express.Router()
const {
  getFilteredProducts,
  getFeaturedProducts,
  getSingleProduct,
  insertProduct,
} = require('../controllers/products')

const checkQueryString = (req, res, next) => {
  if (req.query.featured) return next()
  return next('route')
}

Router.route('/').get(checkQueryString, getFeaturedProducts)
Router.route('/').get(getFilteredProducts).post(insertProduct)
Router.route('/:_id').get(getSingleProduct)

module.exports = Router
