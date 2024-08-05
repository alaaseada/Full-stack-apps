const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: String,
  isDone: {
    type: Boolean,
    default: false,
  },
})

const Task = mongoose.model('Task', schema)
module.exports = Task
