const { CustomeError } = require('../middleware/errors')
const Product = require('../models/products')
const { companies, categories } = require('../data')
const { buildProductsQuery } = require('../utils')

const getFilteredProducts = async (req, res) => {
  const { query, sort, fieldList, page, limit } = buildProductsQuery(req)
  //
  let grandTotal = await Product.countDocuments(query, { limit: 10000 })
  let products = await Product.find(query)
    .collation({ locale: 'en' })
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .select(fieldList)

  return res.status(200).json({
    data: products,
    meta: {
      companies: ['all', ...companies],
      categories: ['all', ...categories],
      pagination: {
        page,
        pageSize: limit,
        pageCount: Math.ceil(grandTotal / limit),
        total: grandTotal,
      },
    },
  })
}

const getFeaturedProducts = async (req, res) => {
  const products = await Product.find({ 'attributes.featured': true }).limit(6)
  return res.status(200).json({ data: products })
}

const getSingleProduct = async (req, res) => {
  const { _id } = req.params
  const product = await Product.findOne({ _id })
  return res.status(200).json({ data: product })
}

const insertProduct = async (req, res, next) => {
  const product = new Product(req.body)
  let newProduct = await product.save()
  return res.status(200).json({
    product: newProduct,
    msg: 'Product has been successfully inserted',
  })
}

module.exports = {
  getFilteredProducts,
  getFeaturedProducts,
  getSingleProduct,
  insertProduct,
}
