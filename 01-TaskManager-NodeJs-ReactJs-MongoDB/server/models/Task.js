const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Must provide a title'],
    maxLength: [50, 'Title can not exceed 50 characters'],
  },
  isDone: {
    type: Boolean,
    default: false,
  },
})

const Task = mongoose.model('Task', schema)
module.exports = Task
