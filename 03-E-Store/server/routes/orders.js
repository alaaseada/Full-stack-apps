const express = require('express')
const Router = express.Router()
const { getAllOrders, insertOrder } = require('../controllers/orders')

Router.route('/').post(insertOrder).get(getAllOrders)

module.exports = Router
