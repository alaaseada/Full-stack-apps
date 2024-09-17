const Product = require('./models/products')
const _ = require('lodash')

const buildProductsQuery = (request) => {
  let {
    page = 1,
    limit = 10,
    search,
    category,
    company,
    order = 'a-z',
    price,
    shipping,
    rating,
    fields,
    numericFilters,
  } = request.query

  let query = {}
  let sort = {}
  let fieldList = {}

  if (search) {
    query['attributes.title'] = { $regex: `.*` + search + `.*`, $options: 'i' }
  }
  if (category && category !== 'all') {
    query['attributes.category'] = {
      $regex: `.*` + category + `.*`,
      $options: 'i',
    }
  }
  if (company && company !== 'all') {
    query['attributes.company'] = {
      $regex: `.*` + company + `.*`,
      $options: 'i',
    }
  }
  if (order) {
    let sortList = order.split(',')
    sortList.forEach((option) => {
      option = option.trim()
      if (option === 'z-a') {
        sort['attributes.title'] = -1
      } else if (option === 'a-z') {
        sort['attributes.title'] = 1
      }
      if (option === 'high') {
        sort['attributes.price'] = -1
      } else if (option === 'low') {
        sort['attributes.price'] = 1
      }
    })
  }
  if (price) {
    query['attributes.price'] = { $lte: price }
  }
  if (shipping) {
    shipping = shipping === 'on' ? true : false
    query['attributes.shipping'] = shipping
  }
  if (rating) {
    query['attributes.rating'] = { $lte: rating }
  }
  if (fields) {
    fieldList = fields.split(',').map((fieldName) => {
      fieldName = fieldName.trim()
      return `attributes.${fieldName}`
    })
  }
  if (numericFilters) {
    const operatorsMap = {
      '>': `$gt`,
      '>=': `$gte`,
      '<': `$lt`,
      '<=': `$lte`,
      '=': `$eq`,
    }
    const re = /(\w+)\s*(>=|<=|=|>|<)\s*(\d+)/g
    for (const match of numericFilters.matchAll(re)) {
      if (['price', 'rating'].includes(match[1])) {
        query[`attributes.${match[1]}`] = {
          [operatorsMap[match[2]]]: Number(match[3]),
        }
      }
    }
  }
  return { query, sort, fieldList, page: Number(page), limit: Number(limit) }
}

const formatPrice = (num) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EGP',
  }).format(num)
}

const stringifyShoppingList = (list) => {
  const orderedList = list.map((item, index) => {
    let { title, company, amount, color, price } = item
    return `${
      index + 1
    }- Title: ${title}, Company: ${company}, Amount: ${amount}, Color: ${color}, Unit price:${formatPrice(
      price
    )}`
  })
  return orderedList.join('\n')
}

const homePageHTML = `<div style='width:600px;margin:0 auto;'>
    <h1 style='text-align:center'>Welcome to our E-store API</h1style=text-align:center></h1>
    <div style='margin:0 auto;'>
    <h3 style='text-decoration:underline'>Endpoints</h3>
    <ul>
    <li><strong>products</strong>: <a href='https://alaaseada-estore-api.netlify.app/api/v1/products'>https://alaaseada-estore-api.netlify.app/api/v1/products</a></li>
    <li><strong>orders</strong>: <a href='https://alaaseada-estore-api.netlify.app/api/v1/orders'>https://alaaseada-estore-api.netlify.app/api/v1/orders</a></li>
    <li><strong>authentication</strong>:<a href='https://alaaseada-estore-api.netlify.app/api/v1/auth'>https://alaaseada-estore-api.netlify.app/api/v1/auth/</a>login|register|:id</li></div></div>`

module.exports = {
  buildProductsQuery,
  stringifyShoppingList,
  formatPrice,
  homePageHTML,
}
