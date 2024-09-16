const mongoose = require('mongoose')
const { companies, categories } = require('../data')

const ProductSchema = mongoose.Schema(
  {
    attributes: {
      title: {
        type: String,
        unique: true,
        required: [true, 'Title is required'],
        maxLength: [50, 'Title cannot exceed 50 characters'],
      },
      company: {
        type: String,
        enum: {
          values: companies,
          message: '{VALUE} is not supported',
        },
        required: [true, 'Company name is required'],
      },
      description: {
        type: String,
        required: [true, 'Description is required'],
        maxLength: [500, 'Description cannot exceed 500 characters'],
      },
      featured: {
        type: Boolean,
        default: false,
      },
      category: {
        type: String,
        enum: {
          values: categories,
          message: '{VALUE} is not supported',
        },
        required: [true, 'Category is required'],
      },
      image: {
        type: String,
        required: [true, 'Image is required'],
      },
      price: {
        type: Number,
        required: [true, 'Price is required'],
      },
      shipping: {
        type: Boolean,
        default: false,
      },
      rating: {
        type: Number,
        default: 4.5,
      },
      colors: [String],
    },
  },
  {
    timestamps: true,
  }
)

const Product = new mongoose.model('Product', ProductSchema)

module.exports = Product
