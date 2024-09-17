const { StatusCodes } = require('http-status-codes')
const Order = require('../models/orders')
const axios = require('axios')
require('dotenv').config()

const getAllOrders = async (req, res) => {
  let { page = 1, limit = 10 } = req.query
  const orders = await Order.find({ userId: { $eq: req.userId } })
  const totalOrders = orders.length
  const pagedOrders = await Order.find({ userId: { $eq: req.userId } })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip((page - 1) * limit)
  const response = {
    orders: pagedOrders,
    meta: {
      pagination: {
        page,
        pageSize: limit,
        pageCount: Math.ceil(totalOrders / limit),
        total: totalOrders,
      },
    },
  }
  return res.status(StatusCodes.OK).json(response)
}

const insertOrder = async (req, res) => {
  const order = await Order.create({ ...req.body, userId: req.userId })
  return res.status(StatusCodes.OK).json({ order, confirmed: true })
}

const doPayment = async (req, res) => {
  const data = {
    profile_id: Number(process.env.PROFILE_ID),
    tran_type: 'sale',
    tran_class: 'ecom',
    cart_description: 'Purchasing furniture items from Modern Furniture Store',
    cart_id: req.body.orderId,
    cart_currency: 'EGP',
    cart_amount: Number(req.body.total_invoice),
  }
  const response = await axios.post(
    'https://secure-egypt.paytabs.com/payment/request',
    data,
    {
      headers: {
        Authorization: process.env.SERVER_KEY,
        'content-type': 'application/json',
      },
    }
  )
  return res
    .status(StatusCodes.OK)
    .json({ redirect_url: response.data.redirect_url })
}
module.exports = {
  getAllOrders,
  insertOrder,
  doPayment,
}
