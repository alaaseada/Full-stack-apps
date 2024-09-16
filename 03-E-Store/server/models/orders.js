const { Schema, model } = require('mongoose')
const emailjs = require('@emailjs/nodejs')
const axios = require('axios')
const { stringifyShoppingList, formatPrice } = require('../utils')
require('dotenv').config()

const orderSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, 'Please provide your first name'],
    },
    last_name: {
      type: String,
      required: [true, 'Please provide your last name'],
    },
    country: {
      type: String,
      required: [true, 'Please provide your address'],
      default: 'Egypt',
    },
    city: {
      type: String,
      required: [true, 'Please provide your address'],
    },
    address: {
      type: String,
      required: [true, 'Please provide your address'],
    },
    phone_number: {
      type: String,
      required: [true, 'Please provide your phone number'],
      match: /^\+(20|966)(1[0125][0-9]{8}|5[0-9]{8})$/,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address'],
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    cartItems: {
      type: [{}],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    items_count: Number,
    total_invoice: String,
  },
  { timestamps: true }
)

orderSchema.post('save', async function () {
  // Prepare the online payment link
  const data = {
    profile_id: Number(process.env.PROFILE_ID),
    tran_type: 'sale',
    tran_class: 'ecom',
    cart_description: 'Purchasing furniture items from Modern Furniture Store',
    cart_id: this._id,
    cart_currency: 'EGP',
    cart_amount: Number(this.total_invoice),
  }
  let response = await axios.post(
    'https://secure-egypt.paytabs.com/payment/request',
    data,
    {
      headers: {
        Authorization: process.env.SERVER_KEY,
        'content-type': 'application/json',
      },
    }
  )
  // Send a confirmation email
  const template_params = {
    first_name: this.first_name,
    last_name: this.last_name,
    country: this.country,
    city: this.city,
    address: this.address,
    phone_number: this.phone_number,
    email: this.email,
    cartItems: stringifyShoppingList(this.cartItems),
    items_count: this.items_count,
    total_invoice: formatPrice(this.total_invoice),
    online_payment_link: response.data.redirect_url,
  }
  emailjs.init({
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
    limitRate: {
      throttle: 10000, // 10s
    },
  })
  response = await emailjs.send(
    process.env.EMAILJS_SERVICE_ID,
    process.env.EMAILJS_TEMPLATE_ID,
    template_params
  )
})

const Order = model('Order', orderSchema)
module.exports = Order
